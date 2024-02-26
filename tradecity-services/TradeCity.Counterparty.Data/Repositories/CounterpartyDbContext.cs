using Microsoft.EntityFrameworkCore;
using TradeCity.Utilities.Configuration;

namespace TradeCity.Counterparty.Data.Repositories;

public class CounterpartyDbContext(TradeCityServiceConfiguration tradeCityServiceConfiguration)
    : DbContext
{
    public DbSet<Entities.Counterparty> Counterparties { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(tradeCityServiceConfiguration.Database.ConnectionString);
    }
}