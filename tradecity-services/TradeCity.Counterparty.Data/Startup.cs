using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using TradeCity.Counterparty.Data.Repositories;
using TradeCity.Utilities.Configuration;

// Startup for migrations

var builder = Host.CreateApplicationBuilder(args);
var env = ConfigurationImporter.GetEnvironment().UnwrapOr(() => TradeCityEnvironment.Development);

builder.Services.AddScoped<TradeCityServiceConfiguration>(_ => ConfigurationImporter.GetServiceConfiguration(env));
builder.Services.AddDbContext<CounterpartyDbContext>();

var app = builder.Build();

app.RunAsync();