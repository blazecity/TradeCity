using Grpc.Net.Client;
using TradeCity.Counterparty.Grpc.Messages;

namespace TradeCity.Counterparty.Grpc.Client;

using CounterpartyGrpcClient = CounterpartyService.CounterpartyServiceClient;

public static class CounterpartyGrpcClientFactory
{
    public static CounterpartyGrpcClient CreateClient(string connectionAddress)
    {
        return new CounterpartyGrpcClient(GrpcChannel.ForAddress(connectionAddress)); 
    }
}