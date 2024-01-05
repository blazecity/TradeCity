using Microsoft.EntityFrameworkCore;
using TradeCity.Clients.Core;

namespace TradeCity.Clients.Data;

public class ClientsDbContext: DbContext
{
    public DbSet<Client> Clients { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql("Host=localhost;Database=tradecity;Username=postgres;Password=postgres");
    }
}