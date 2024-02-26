using HotChocolate.Resolvers;
using TradeCity.Counterparty.GraphQL.Entities;
using TradeCity.Counterparty.Grpc.Messages;
using TradeCity.Utilities.Error.Handling;

namespace TradeCity.Counterparty.GraphQL.Queries;

using CounterpartyGrpcClient = CounterpartyService.CounterpartyServiceClient;

public class CounterpartyQuery
{
    public async Task<Entities.Counterparty?> CounterpartyById(ulong id, CounterpartyGrpcClient grpcClient, IResolverContext context)
    {
        var request = new GetCounterpartyByIdRequest
        {
            Id = id
        };

        var handler = new GraphQlErrorHandler(context);
        var response = await handler.MakeGrpcRequest(async () => await grpcClient.GetCounterpartyByIdAsync(request));

        return response.Match(
            cp => CounterpartyMapper.FromGrpc(cp.Counterparty),
            _ => null
        );
    }
}