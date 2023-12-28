open System
open HotChocolate
open Microsoft.AspNetCore.Builder
open Microsoft.Extensions.DependencyInjection
open Microsoft.Extensions.Hosting

type Temp = {
    A: string
    B: string
}

type Query() =
    [<GraphQLNonNullType>]
    member this.Temp() = {
        A = "T"
        B = "E"
    }
    
    member this.TempById(id: int) = {
        A = id.ToString()
        B = "TEB"
    }

[<EntryPoint>]
let main args =
    let builder = WebApplication.CreateBuilder(args)
    
    builder.Services
        .AddGraphQLServer()
        .InitializeOnStartup()
        .AddQueryType<Query>()
        |> ignore
        
    //builder.Services
      //  .AddCors(fun options -> options.AddPolicy("_allowAllPolicy", fun policy -> policy.AllowAnyOrigin() |> ignore)) |> ignore
    
    let app = builder.Build()
    
    app.MapGraphQL() |> ignore

    app.MapGet("/", Func<string>(fun () -> "Hello World!")) |> ignore

    app.RunWithGraphQLCommands(args)

    0 // Exit code

