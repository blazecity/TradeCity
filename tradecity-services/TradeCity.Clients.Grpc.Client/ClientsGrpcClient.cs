using Clients;
using Grpc.Net.Client;

namespace TradeCity.Clients.Grpc.Client;

public class ClientsGrpcClient(ClientsGrpcClient.Configuration options)
{
    public record Configuration (string Address);
    
    public ClientAdministration.ClientAdministrationClient Client { get; init; } = new(GrpcChannel.ForAddress(options.Address));
}