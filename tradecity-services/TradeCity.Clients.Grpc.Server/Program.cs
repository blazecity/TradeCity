using TradeCity.Clients.Grpc.Server.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddGrpc();
builder.Services.AddGrpcReflection();

var app = builder.Build();
app.MapGrpcService<ClientsService>();

var env = app.Environment;

if (env.IsDevelopment())
{
    app.MapGrpcReflectionService();
}

app.Run();