use chrono::{Datelike, NaiveDate, Months};
use rust_decimal::{Decimal, MathematicalOps};
use std::cmp::max;
use std::collections::HashMap;
use rust_decimal_macros::dec;

struct PricingRequestMessage {
    frequency: usize,
    nominal_value: Decimal,
    coupon_paying_agent_fee_bps: Decimal,
    out_of_pocket_fee: Decimal,
    redemption_fee_bps: Decimal,
    tenors: HashMap<Decimal, PricingRequestTenor>,
}

struct PricingRequestTenor {
    net_fee: Decimal,
    fix_reoffer_spread: Decimal,
}

struct PricingRequest {
    frequency: usize,
    nominal_value: Decimal,
    coupon_paying_agent_fee_bps: Decimal,
    out_of_pocket_fee: Decimal,
    redemption_fee_bps: Decimal,
    tenors: HashMap<Decimal, PricingRequestTenor>
}

struct PricingCalculations {}
impl PricingCalculations {
    fn payment_period(payment_frequency: usize, day_count: DayCounts) -> Decimal {
        match day_count {
            DayCounts::ThirtyE360ISDA => Decimal::from(360 / payment_frequency)
        }
    }

    fn date_of_first_coupon(value_date: NaiveDate, maturity: NaiveDate) -> Result<NaiveDate, String> {
        if value_date > maturity { return Err("Maturity must be greater or equal than value date".to_string()) }

        Ok(NaiveDate::from_ymd_opt(value_date.year() + 1, maturity.month(), maturity.day()).unwrap())
    }

    fn days_to_first_coupon(value_date: NaiveDate, first_coupon_date: NaiveDate, day_count: DayCounts) -> Result<Decimal, String> {
        Self::days(value_date, first_coupon_date, day_count)
    }

    fn maturity(tenor: Decimal, value_date: NaiveDate) -> Result<NaiveDate, String> {
        let months = u32::try_from(tenor * dec!(12));

        if let Ok(m) = months {
            let date = value_date.checked_add_months(Months::new(m));
            if let Some(d) = date {
                Ok(d)
            } else {
                Err("Maturity date out of range".to_string())
            }
        } else {
            Err("Failed to convert tenor to months".to_string())
        }
    }

    fn days_to_maturity(value_date: NaiveDate, maturity: NaiveDate, day_count: DayCounts) -> Result<Decimal, String> {
        Self::days(value_date, maturity, day_count)
    }

    fn total_payments(total_days: Decimal, days_to_first_coupon: Decimal, payment_period: Decimal) -> Decimal {
        (total_days - days_to_first_coupon) / payment_period + Decimal::ONE
    }

    fn days(start: NaiveDate, end: NaiveDate, day_count: DayCounts) -> Result<Decimal, String> {
        if start > end { return Err("End date must be greater or equal than start date".to_string()); }

        let start_day = Decimal::from(start.day());
        let end_day = Decimal::from(end.day());
        let start_month = Decimal::from(start.month());
        let end_month = Decimal::from(end.month());
        let start_year = Decimal::from(start.year());
        let end_year = Decimal::from(end.year());

        match day_count {
            DayCounts::ThirtyE360ISDA => Ok(dec!(360) * (end_year - start_year) + dec!(30) * (end_month - start_month) + (end_day - start_day)),
        }
    }

    fn fix_reoffer_yield(swap: Decimal, fix_reoffer_spread_bps: Decimal) -> Decimal {
        swap + fix_reoffer_spread_bps / dec!(10_000)
    }

    fn coupon(fix_reoffer_yield: Decimal) -> Decimal {
        max((fix_reoffer_yield * dec!(2_000)).ceil() / dec!(2_000), Decimal::ZERO)
    }

    fn all_in_fee(coupon_paying_agent_fee_bps: Decimal, coupon: Decimal) -> Decimal {
        coupon + coupon_paying_agent_fee_bps / dec!(10_000)
    }

    fn all_in_redemption(redemption: Decimal, redemption_fee_bps: Decimal) -> Decimal {
        redemption + redemption_fee_bps / dec!(10_000)
    }

    fn all_in_price(cashflow_issuer: Decimal, nominal_value: Decimal) -> Decimal {
        cashflow_issuer / nominal_value
    }

    fn cashflow_issuer(
        cashflow_investor: Decimal,
        six_fee_nom: Decimal,
        net_fee_in_bps: Decimal,
        out_of_pocket_fee: Decimal,
        nominal_value: Decimal
    ) -> Decimal {
        -(cashflow_investor + six_fee_nom + out_of_pocket_fee) - nominal_value * net_fee_in_bps / dec!(10_000)
    }

    fn cashflow_investor(price: Decimal, nominal_value: Decimal) -> Decimal {
        -price * nominal_value
    }

    fn bond_price(
        discounted_redemption: Decimal,
        sum_discounted_cashflows: Decimal,
        accrued_interest: Decimal,
    ) -> Decimal {
        discounted_redemption + sum_discounted_cashflows - accrued_interest
    }

    fn discounted_redemption(
        redemption: Decimal,
        chf_mid_swap_fix_vs_saron: Decimal,
        fix_reoffer_spread_in_bps: Decimal,
        total_payments: Decimal,
        days_to_first_coupon: Decimal,
        payment_period: Decimal,
        frequency: i32
    ) -> Decimal {
        let yld = fix_reoffer_spread_in_bps / dec!(10_000) + chf_mid_swap_fix_vs_saron;
        redemption / (Decimal::ONE + yld / Decimal::from(frequency)).powd(
            total_payments - Decimal::ONE + days_to_first_coupon / payment_period
        )
    }

    fn discounted_cashflow(
        year: u32,
        coupon: Decimal,
        chf_mid_swap_fix_vs_saron: Decimal,
        fix_reoffer_spread_in_bps: Decimal,
        days_to_first_coupon: Decimal,
        payment_period: Decimal,
        frequency: i32
    ) -> Decimal {
        let yld = fix_reoffer_spread_in_bps / dec!(10_000) + chf_mid_swap_fix_vs_saron;
        coupon / Decimal::from(frequency) / (Decimal::ONE + yld).powd(Decimal::from(year) - Decimal::ONE + days_to_first_coupon / payment_period)
    }

    fn sum_discounted_cashflows(
        total_payments: Decimal,
        coupon: Decimal,
        chf_mid_swap_fix_vs_saron: Decimal,
        fix_reoffer_spread_in_bps: Decimal,
        days_to_first_coupon: Decimal,
        payment_period: Decimal,
        frequency: i32
    ) -> Result<Decimal, String> {
        let mut future_value = Decimal::ZERO;
        let range = match u32::try_from(total_payments) {
            Ok(r) => r,
            Err(_) => return Err("Failed to convert total payments into unsigned integer".to_string())
        };

        for year in 1..=range {
            future_value += Self::discounted_cashflow(year, coupon, chf_mid_swap_fix_vs_saron, fix_reoffer_spread_in_bps, days_to_first_coupon, payment_period, frequency);
        }

        Ok(future_value)
    }

    fn accrued_interest(coupon: Decimal, days_to_first_coupon: Decimal, payment_period: Decimal) -> Decimal {
        coupon / payment_period * (days_to_first_coupon - payment_period) / payment_period
    }

    fn price(
        maturity: NaiveDate,
        value_date: NaiveDate,
        rate: Decimal,
        yld: Decimal,
        redemption: Decimal,
        frequency: i32,
        day_count: DayCounts,
        payment_period: Decimal
    ) -> Result<Decimal, String> {
        let a = Self::days(value_date, value_date, day_count).unwrap();
        let frequency_decimal = Decimal::from(frequency);

        let date_first_coupon_res = Self::date_of_first_coupon(value_date, maturity);
        if let Err(error_message) = date_first_coupon_res { return Err(error_message); }
        let date_first_coupon = date_first_coupon_res.unwrap();

        let dsc_res = Self::days_to_first_coupon(value_date, date_first_coupon, day_count);
        if let Err(error_message) = dsc_res { return Err(error_message); }
        let dsc = dsc_res.unwrap();

        let e_res = Self::days(value_date, value_date.checked_add_months(Months::new(12)).unwrap(), day_count);
        if let Err(error_message) = e_res { return Err(error_message); }
        let e = e_res.unwrap();

        let days_to_mat_res = Self::days_to_maturity(value_date, maturity, day_count);
        if let Err(error_message) = days_to_mat_res { return Err(error_message); }
        let days_to_maturity = days_to_mat_res.unwrap();

        let days_to_first_coupon_res = Self::days_to_first_coupon(value_date, date_first_coupon, day_count);
        if let Err(error_message) = days_to_first_coupon_res { return Err(error_message); }
        let days_to_first_coupon = days_to_first_coupon_res.unwrap();

        let n = Self::total_payments(days_to_maturity, days_to_first_coupon, payment_period);

        let dsc_e = dsc / e;

        let t1 = rate / frequency_decimal;

        if n == Decimal::ONE {
            let dsr = e - a;
            let res = (t1 + redemption) / (yld / frequency_decimal * dsr / e + Decimal::ONE) - (t1 * a / e);
            return Ok(res);
        }

        let mut ret = (redemption / (Decimal::ONE + yld / frequency_decimal).powd(n - Decimal::ONE + dsc_e)) - (t1 * a / e);
        let t2 = Decimal::ONE + yld / frequency_decimal;

        let x_res = i32::try_from(n);
        if let Err(_) = x_res {
            return Err("Failed to convert decimal into interger".to_string());
        }
        let x = x_res.unwrap();

        for k in 0..x {
            ret += t1 / t2.powd(Decimal::from(k) + dsc_e);
        }

        return Ok(ret);

    }

    fn bond_yield(
        maturity: NaiveDate,
        value_date: NaiveDate,
        rate: Decimal,
        price: Decimal,
        redemption: Decimal,
        frequency: i32,
        day_count: DayCounts,
        payment_period: Decimal
    ) -> Result<Decimal, String> {
        let mut yield_lower = Decimal::ZERO;
        let mut yield_upper = Decimal::ONE;
        let mut yield_middle = (yield_upper - yield_lower) * dec!(0.5);

        let price_lower_res = Self::price(maturity, value_date, rate, yield_lower, redemption, frequency, day_count, payment_period);
        let mut price_lower = match price_lower_res {
            Ok(p) => p,
            Err(error_message) => return Err(error_message)
        };

        let price_upper_res = Self::price(maturity, value_date, rate, yield_upper, redemption, frequency, day_count, payment_period);
        let mut price_upper = match price_upper_res {
            Ok(p) => p,
            Err(error_message) => return Err(error_message)
        };

        for _ in 0..=100 {
            let price_middle_res = Self::price(maturity, value_date, rate, yield_middle, redemption, frequency, day_count, payment_period);
            let price_middle = match price_middle_res {
                Ok(p) => p,
                Err(error_message) => return Err(error_message)
            };

            if price == price_lower { return Ok(yield_lower); }
            if price == price_upper { return Ok(yield_upper); }
            if price == price_middle { return Ok(yield_middle); }

            if price < price_upper {
                yield_upper *= Decimal::TWO;
                let price_upper_res_i = Self::price(maturity, value_date, rate, yield_upper, redemption, frequency, day_count, payment_period);
                price_upper = match price_upper_res_i {
                    Ok(p) => p,
                    Err(error_message) => return Err(error_message)
                };
                yield_middle = (yield_upper - yield_lower) * dec!(0.5);
                continue;
            }

            if price < price_middle {
                yield_lower = yield_middle;
                price_lower = price_middle;
            } else {
                yield_upper = yield_middle;
                price_upper = price_middle;
            }

            yield_middle = yield_upper - (yield_upper - yield_lower) * ((price - price_upper) / (price_lower - price_upper));
        }

        Ok(yield_middle)
    }

    fn all_in_yield(
        value_date: NaiveDate,
        tenor: Decimal,
        coupon: Decimal,
        frequency: i32,
        nominal_value: Decimal,
        coupon_paying_agent_fee_bps: Decimal,
        chf_mid_swap_fix_vs_saron: Decimal,
        fix_reoffer_spread_in_bps: Decimal,
        net_fee: Decimal,
        out_of_pocket_fee: Decimal,
        redemption_fee_bps: Decimal,
        day_count: DayCounts,
        payment_period: Decimal,
        redemption: Decimal
    ) -> Result<Decimal, String> {
        let maturity = match Self::maturity(tenor, value_date) {
            Ok(m) => m,
            Err(error_message) => return Err(error_message)
        };

        let all_in_fee = Self::all_in_fee(coupon_paying_agent_fee_bps, coupon);
        
        let days_to_maturity = match Self::days_to_maturity(value_date, maturity, day_count) {
            Ok(d) => d,
            Err(error_message) => return Err(error_message)
        };

        let first_coupon_date = match Self::date_of_first_coupon(value_date, maturity) {
            Ok(d) => d,
            Err(error_message) => return Err(error_message)
        };

        let days_to_first_coupon = match Self::days_to_first_coupon(value_date, first_coupon_date, day_count) {
            Ok(d) => d,
            Err(error_message) => return Err(error_message)
        };

        let total_payments = Self::total_payments(days_to_maturity, days_to_first_coupon, payment_period);

        let discounted_redemption = Self::discounted_redemption(redemption, chf_mid_swap_fix_vs_saron, fix_reoffer_spread_in_bps, total_payments, days_to_first_coupon, payment_period, frequency);
        let sum_discounted_cashflows = match Self::sum_discounted_cashflows(total_payments, coupon, chf_mid_swap_fix_vs_saron, fix_reoffer_spread_in_bps, days_to_first_coupon, payment_period, frequency) {
            Ok(s) => s,
            Err(error_message) => return Err(error_message)
        };

        let accrued_interest = Self::accrued_interest(coupon, days_to_first_coupon, payment_period);
        let bond_price = Self::bond_price(discounted_redemption, sum_discounted_cashflows, accrued_interest);
        let cashflow_investor = Self::cashflow_investor(bond_price, nominal_value);
        let cashflow_issuer = Self::cashflow_issuer(cashflow_investor, Decimal::ZERO, net_fee, out_of_pocket_fee, nominal_value);
        let all_in_price = Self::all_in_price(cashflow_issuer, nominal_value);
        let all_in_redemptionn = Self::all_in_redemption(redemption, redemption_fee_bps);

        Self::bond_yield(maturity, value_date, all_in_fee, all_in_price, all_in_redemptionn, frequency, day_count, payment_period)
    }

    fn present_value(rate: Decimal, periods: Decimal, payment_per_period: Decimal, future_value: Decimal, payment_timing: PaymentTiming) -> Decimal {
        if rate == Decimal::ZERO {
            return -future_value - (payment_per_period * periods);
        }

        let rate_nper = (Decimal::ONE + rate).powd(periods);
        -future_value - payment_per_period * (Decimal::ONE + rate * Decimal::from(payment_timing as u8)) * ((rate_nper - Decimal::ONE) / rate) / rate_nper
    }

    fn constant_payment(rate: Decimal, periods: Decimal, present_value: Decimal, future_value: Decimal, payment_timing: PaymentTiming) -> Decimal {
        if rate == Decimal::ZERO {
            return (-present_value - future_value) / periods;
        }

        let rate_nper = (Decimal::ONE + rate).powd(periods);
        ((-future_value - present_value) * rate_nper) / ((Decimal::ONE + rate * Decimal::from(payment_timing as u8)) * ((rate_nper - Decimal::ONE) / rate))
    }

    fn all_in_spread_vs_3m(
        tenor: Decimal, 
        all_in_spread: Decimal, 
        chf_conversion_swap: Decimal, 
        fx_conversion_swap: Decimal, 
        fx_basis_swap_3m: Decimal, 
        payment_timing: PaymentTiming
    ) -> Decimal {
        let conversion_factor_chf_pv = Self::present_value(chf_conversion_swap, tenor, Decimal::ONE, Decimal::ZERO, payment_timing);
        let fx_conversion_factor = Self::constant_payment(fx_conversion_swap, tenor, conversion_factor_chf_pv, Decimal::ZERO, payment_timing);
        all_in_spread * fx_conversion_factor + fx_basis_swap_3m
    }

    fn all_in_spread_vs_6m(all_in_spread_vs_3m: Decimal, basis_swap_3m_vs_6m: Decimal) -> Decimal {
        all_in_spread_vs_3m + basis_swap_3m_vs_6m
    }

}

#[derive(Clone, Copy)]
enum DayCounts {
    ThirtyE360ISDA,
}

#[derive(Clone, Copy)]
enum PaymentTiming {
    EndOfPeriod,
    StartOfPeriod
}

#[cfg(test)]
mod tests {
    use chrono::Month;

    use super::*;

    #[test]
    fn test_maturity_whole_years() {
        // Arrange
        let value_date = NaiveDate::from_ymd_opt(2022, Month::November.number_from_month(), 3).unwrap();

        // Act
        let maturity = PricingCalculations::maturity(Decimal::TWO, value_date);

        // Assert
        assert_eq!(NaiveDate::from_ymd_opt(2024, Month::November.number_from_month(), 3).unwrap(), maturity.unwrap());
    }

    #[test]
    fn test_maturity_started_year() {
        // Arrange
        let value_date = NaiveDate::from_ymd_opt(2022, Month::November.number_from_month(), 3).unwrap();

        // Act
        let maturity = PricingCalculations::maturity(dec!(3.41), value_date);

        // Assert
        assert_eq!(NaiveDate::from_ymd_opt(2026, Month::March.number_from_month(), 3).unwrap(), maturity.unwrap());
    }

    #[test]
    fn test_all_in_fee() {
        // Act
        let all_in_fee = PricingCalculations::all_in_fee(Decimal::ONE, dec!(0.006));

        // Assert
        assert_eq!(dec!(0.0061), all_in_fee);
    }

    #[test]
    fn test_fix_reoffer_yield() {
        // Act
        let result = PricingCalculations::fix_reoffer_yield(dec!(0.0061), dec!(6));

        // Assert
        assert_eq!(dec!(0.0067), result);
    }

    #[test]
    fn test_coupon() {
        // Act
        let result = PricingCalculations::coupon(dec!(0.0067));

        // Assert
        assert_eq!(dec!(0.007), result);
    }

    #[test]
    fn test_all_in_redemption() {
        // Act
        let result = PricingCalculations::all_in_redemption(Decimal::ONE, Decimal::ONE);

        // Assert
        assert_eq!(dec!(1.0001), result);
    }

    #[test]
    fn test_discounted_cashflow() {
        // Act
        let dcf = PricingCalculations::discounted_cashflow(1, dec!(0.007), dec!(0.003), dec!(14), dec!(360), dec!(360), 1);

        // Assert
        assert_eq!(dec!(0.00697), dcf.round_dp(5));
    }

    #[test]
    fn test_sum_discounted_cashflows() {
        // Act
        let dcf_sum = PricingCalculations::sum_discounted_cashflows(dec!(4), dec!(0.007), dec!(0.003), dec!(14), dec!(360), dec!(360), 1).unwrap();

        // Assert
        assert_eq!(dec!(0.0277), dcf_sum.round_dp(4));
    }

    #[test]
    fn test_discounted_redemption() {
        // Act
        let result = PricingCalculations::discounted_redemption(Decimal::ONE, dec!(0.003), dec!(14), dec!(4), dec!(360), dec!(360), 1);

        // Assert
        assert_eq!(dec!(0.9825919093), result.round_dp(10));
    }

    #[test]
    fn test_accrued_interest() {
        // Act
        let result = PricingCalculations::accrued_interest(dec!(0.007), dec!(360), dec!(360));

        // Assert
        assert_eq!(Decimal::ZERO, result);
    }

    #[test]
    fn test_bond_price() {
        // Act
        let result = PricingCalculations::bond_price(dec!(0.9825919093), dec!(0.02769468968), Decimal::ZERO);

        // Assert
        assert_eq!(dec!(1.010286599), result.round_dp(9));
    }

    #[test]
    fn test_cashflow_investor() {
        // Act
        let result = PricingCalculations::cashflow_investor(dec!(1.010286599), dec!(100_000_000));

        // Assert
        assert_eq!(dec!(-101_028_659.90), result.round_dp(2));
    }

    #[test]
    fn test_cashflow_issuer() {
        // Act
        let result = PricingCalculations::cashflow_issuer(dec!(-101_028_659.90), Decimal::ZERO, dec!(17.5), dec!(50_000), dec!(100_000_000));

        // Assert
        assert_eq!(dec!(100_803_659.90), result.round_dp(2));
    }

    #[test]
    fn test_price_one_year() {
        // Arrange
        let maturity = NaiveDate::from_ymd_opt(2023, Month::October.number_from_month(), 30).unwrap();
        let value_date = NaiveDate::from_ymd_opt(2022, Month::October.number_from_month(), 30).unwrap();

        // Act
        let price = PricingCalculations::price(maturity, value_date, dec!(0.02), dec!(0.04082), Decimal::ONE, 1, DayCounts::ThirtyE360ISDA, dec!(360)).unwrap();
        
        // Assert
        assert_eq!(dec!(0.98), price.round_dp(2));
    }

    #[test]
    fn test_price_two_years() {
        // Arrange
        let maturity = NaiveDate::from_ymd_opt(2024, Month::October.number_from_month(), 30).unwrap();
        let value_date = NaiveDate::from_ymd_opt(2022, Month::October.number_from_month(), 30).unwrap();

        // Act
        let price = PricingCalculations::price(maturity, value_date, dec!(0.02), dec!(0.03046), Decimal::ONE, 1, DayCounts::ThirtyE360ISDA, dec!(360)).unwrap();
        
        // Assert
        assert_eq!(dec!(0.98), price.round_dp(2));
    }

    #[test]
    fn test_bond_yield_one_year() {
        // Arrange
        let maturity = NaiveDate::from_ymd_opt(2023, Month::October.number_from_month(), 30).unwrap();
        let value_date = NaiveDate::from_ymd_opt(2022, Month::October.number_from_month(), 30).unwrap();

        // Act
        let yld = PricingCalculations::bond_yield(maturity, value_date, dec!(0.02), dec!(0.98), Decimal::ONE, 1, DayCounts::ThirtyE360ISDA, dec!(360)).unwrap();

        // Assert
        assert_eq!(dec!(0.04082), yld.round_dp(5));
    }

    #[test]
    fn test_bond_yield_two_years() {
        // Arrange
        let maturity = NaiveDate::from_ymd_opt(2024, Month::October.number_from_month(), 30).unwrap();
        let value_date = NaiveDate::from_ymd_opt(2022, Month::October.number_from_month(), 30).unwrap();

        // Act
        let yld = PricingCalculations::bond_yield(maturity, value_date, dec!(0.02), dec!(0.98), Decimal::ONE, 1, DayCounts::ThirtyE360ISDA, dec!(360)).unwrap();

        // Assert
        assert_eq!(dec!(0.03046), yld.round_dp(5));
    }

    #[test]
    fn test_bond_yield_four_years() {
        // Arrange
        let maturity = NaiveDate::from_ymd_opt(2026, Month::October.number_from_month(), 30).unwrap();
        let value_date = NaiveDate::from_ymd_opt(2022, Month::October.number_from_month(), 30).unwrap();

        // Act
        let yld = PricingCalculations::bond_yield(maturity, value_date, dec!(0.0071), dec!(1.008), dec!(1.0001), 1, DayCounts::ThirtyE360ISDA, dec!(360)).unwrap();

        // Assert
        assert_eq!(dec!(0.0051), yld.round_dp(4));
    }

    #[test]
    fn test_pv_zero_coupon() {
        // Act
        let pv = PricingCalculations::present_value(Decimal::ZERO, dec!(4), Decimal::ONE, Decimal::ZERO, PaymentTiming::EndOfPeriod);

        // Assert
        assert_eq!(dec!(-4), pv);
    }

    #[test]
    fn test_pv_non_zero_coupon() {
        // Act
        let pv = PricingCalculations::present_value(dec!(0.021), dec!(3), Decimal::ONE, Decimal::ZERO, PaymentTiming::EndOfPeriod);

        // Assert
        assert_eq!(dec!(-2.878275), pv.round_dp(6));
    }

    #[test]
    fn test_constant_payment_zero_coupon() {
        // Act
        let constant_payment = PricingCalculations::constant_payment(Decimal::ZERO, dec!(4), dec!(-4), Decimal::ZERO, PaymentTiming::EndOfPeriod);

        // Assert
        assert_eq!(Decimal::ONE, constant_payment);
    }

    #[test]
    fn test_constant_payment_non_zero_coupon() {
        // Act
        let constant_payment = PricingCalculations::constant_payment(dec!(0.021), dec!(3), dec!(-2.878275), Decimal::ZERO, PaymentTiming::EndOfPeriod);

        // Assert
        assert_eq!(Decimal::ONE, constant_payment.round_dp(0));
    }

    #[test]
    fn test_all_in_yield() {
        // Arrange
        let value_date = NaiveDate::from_ymd_opt(2022, Month::October.number_from_month(), 30).unwrap();
        
        // Act
        let all_in_yield = PricingCalculations::all_in_yield(value_date, dec!(4), dec!(0.0075), 1, dec!(100_000_000), dec!(1), dec!(0.0061), dec!(14), dec!(17.5), dec!(15_000), dec!(1), DayCounts::ThirtyE360ISDA, dec!(360), Decimal::ONE).unwrap();

        // Assert
        assert_eq!(dec!(0.0081094), all_in_yield.round_dp(7));
    }
}
