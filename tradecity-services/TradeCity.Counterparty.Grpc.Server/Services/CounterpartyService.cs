using Grpc.Core;
using TradeCity.Counterparty.Data.Repositories;
using TradeCity.Counterparty.Grpc.Messages;
using TradeCity.Counterparty.Grpc.Server.Mapping;
using TradeCity.Utilities.Error.Handling;

namespace TradeCity.Counterparty.Grpc.Server.Services;

public class CounterpartyService(CounterpartyRepository repository)
    : Messages.CounterpartyService.CounterpartyServiceBase
{
    public override Task<GetCounterpartyByIdResponse> GetCounterpartyById(GetCounterpartyByIdRequest request, ServerCallContext context)
    {
        var result = repository.GetById(request.Id);

        return result.Match(
            cp => Task.FromResult(new GetCounterpartyByIdResponse
            {
                Counterparty = CounterpartyMapper.MapFromEntity(cp)
            }),
            err => throw GrpcHandler.RpcException(StatusCode.Internal, err.Message, err.ErrorCode)
        );
    }
}