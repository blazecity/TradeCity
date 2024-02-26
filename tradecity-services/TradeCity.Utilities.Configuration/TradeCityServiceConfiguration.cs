namespace TradeCity.Utilities.Configuration;

public record DatabaseConfiguration
{
    public string ConnectionString { get; init; }
    public string Schema { get; init; }
}

public record TradeCityServiceConfiguration
{
    public string Service { get; init; }
    public DatabaseConfiguration Database { get; init; }
}