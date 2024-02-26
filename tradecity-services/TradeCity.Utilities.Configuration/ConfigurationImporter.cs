using Microsoft.Extensions.Configuration;
using TradeCity.Utilities.Functional;

namespace TradeCity.Utilities.Configuration;

public static class ConfigurationImporter
{
    public static TradeCityServiceSettings GetSettings()
    {
        return new ConfigurationBuilder()
            .AddJsonFile("settings.json")
            .Build()
            .Get<TradeCityServiceSettings>();
    }

    public static TradeCityServiceConfiguration GetServiceConfiguration(TradeCityEnvironment env)
    {
        var fileName = env == TradeCityEnvironment.Production ? "configuration.json" : "configuration.Development.json";
        
        return new ConfigurationBuilder()
            .AddJsonFile(fileName)
            .Build()
            .Get<TradeCityServiceConfiguration>();
    }

    public static Option<TradeCityEnvironment> GetEnvironment()
    {
        var env = Environment.GetEnvironmentVariable("TRADECITY_ENVIRONMENT");
        if (env == null) return Option<TradeCityEnvironment>.None();

        return Option.Some(env.Equals("development", StringComparison.CurrentCultureIgnoreCase)
            ? TradeCityEnvironment.Development
            : TradeCityEnvironment.Production);
    }
}