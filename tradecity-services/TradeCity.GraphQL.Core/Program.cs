using TradeCity.Counterparty.GraphQL.Queries;
using TradeCity.Counterparty.Grpc.Client;
using TradeCity.Counterparty.Grpc.Messages;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddScoped(_ => CounterpartyGrpcClientFactory.CreateClient("http://localhost:5176"))
    .AddGraphQLServer()
    .AddQueryType<CounterpartyQuery>()
    .InitializeOnStartup()
    .RegisterService<CounterpartyService.CounterpartyServiceClient>();

var app = builder.Build();

app.MapGraphQL();

app.MapGet("/health", () => "ok");

app.Run();
