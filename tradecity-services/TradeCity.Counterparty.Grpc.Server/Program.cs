using Microsoft.EntityFrameworkCore;
using TradeCity.Counterparty.Data.Repositories;
using TradeCity.Counterparty.Grpc.Server.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddGrpc();
builder.Services.AddGrpcReflection();
builder.Services.AddDbContext<CounterpartyDbContext>(
    options => options.UseNpgsql(builder.Configuration.GetConnectionString("Production"))
);
builder.Services.AddScoped<CounterpartyRepository>();

var app = builder.Build();
app.MapGrpcService<CounterpartyService>();

var env = app.Environment;

if (env.IsDevelopment())
{
    app.MapGrpcReflectionService();
}

app.Run();