module TradeCity.GraphQL.Core.Models.Clients.ClientManagement

open Clients
open HotChocolate
open HotChocolate.Types
open TradeCity.Clients.Grpc.Client

type BaseClient = {
    Name: string
    BloombergCode: string
    Key: string
}

type GrpcBaseClient = Clients.BaseClient
type ClientId = uint64

[<Struct>]
type Client =
    {
        [<GraphQLType(typedefof<UnsignedLongType>)>] Id: ClientId
        Name: string
        Key: string
        BloombergCode: string
        Active: bool
    }

let mapToGrpcBaseClient (client: BaseClient) = GrpcBaseClient(
        Name = client.Name,
        BloombergCode = client.BloombergCode,
        Key = client.Key
    )

let mapToGraphQLClient (client: SingleClient) = {
    Id = client.Id
    Name = client.Name
    Key = client.Key
    BloombergCode = client.BloombergCode
    Active = client.Active
}

let mapToGraphQLClientList (clientList: ClientList) = Seq.map mapToGraphQLClient clientList.Clients

type ClientMutation() =
    member this.AddClient(client: BaseClient, grpcClient: ClientsGrpcClient) =
        mapToGrpcBaseClient client
        |> grpcClient.Client.AddClient
        |> _.Id

type ClientQuery() =    
    [<GraphQLNonNullType>]
    member this.ClientById(id: ClientId, grpcClient: ClientsGrpcClient) =
        GetClientByIdRequest(Id = id)
        |> grpcClient.Client.GetClientById
        |> mapToGraphQLClient
    
    [<GraphQLNonNullType>]
    member this.ClientByName(name: string, grpcClient: ClientsGrpcClient) =
        GetClientByNameRequest(Name = name)
        |> grpcClient.Client.GetClientsByName
        |> mapToGraphQLClientList
        
    [<GraphQLNonNullType>]
    member this.ClientByKey(key: string, grpcClient: ClientsGrpcClient) =
        GetClientByKeyRequest(Key = key)
        |> grpcClient.Client.GetClientByKey
        |> mapToGraphQLClient
    
    [<GraphQLNonNullType>]
    member this.ClientByBloombergCode(bloombergCode: string, grpcClient: ClientsGrpcClient) =
        GetClientByBloombergCodeRequest(BloombergCode = bloombergCode)
        |> grpcClient.Client.GetClientByBloombergCode
        |> mapToGraphQLClient
