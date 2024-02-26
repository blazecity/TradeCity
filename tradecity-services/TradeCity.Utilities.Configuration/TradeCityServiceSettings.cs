namespace TradeCity.Utilities.Configuration;

public readonly record struct TradeCityServiceSettings
{
    public string Environment { get; init; }

    public bool IsDevelopment() => Environment.Equals("production", StringComparison.CurrentCultureIgnoreCase);
}