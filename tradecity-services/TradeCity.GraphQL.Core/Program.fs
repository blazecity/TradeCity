open System
open Microsoft.AspNetCore.Builder
open Microsoft.Extensions.DependencyInjection
open Microsoft.Extensions.Hosting
open TradeCity.Clients.Grpc.Client
open TradeCity.GraphQL.Core.Models.Clients.ClientManagement

[<EntryPoint>]
let main args =
    let builder = WebApplication.CreateBuilder(args)
    
    builder
        .Services
        .AddScoped<ClientsGrpcClient>(fun _ -> ClientsGrpcClient(ClientsGrpcClient.Configuration("http://localhost:5223")))
        .AddGraphQLServer()
        .AddQueryType<ClientQuery>()
        .AddMutationType<ClientMutation>()
        .InitializeOnStartup()
        .RegisterService<ClientsGrpcClient>() |> ignore
    
    let app = builder.Build()
    
    app.MapGraphQL() |> ignore

    app.MapGet("/", Func<string>(fun () -> "Hello World!")) |> ignore

    app.RunWithGraphQLCommands(args)

    0 // Exit code

