using TradeCity.Utilities.Functional;

namespace TradeCity.Utilities.Error.Handling;

public struct DatabaseHandler
{
    public static Result<Unit> CheckDatabase(bool canConnect)
    {
        return canConnect 
            ? Result.Ok(new Unit()) 
            : new TradeCityException("unable to connect to database", ErrorCodes.NoDatabaseConnection.GetCode());
    }
}