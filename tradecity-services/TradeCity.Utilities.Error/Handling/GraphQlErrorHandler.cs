using Grpc.Core;
using HotChocolate;
using HotChocolate.Resolvers;
using TradeCity.Utilities.Functional;

namespace TradeCity.Utilities.Error.Handling;

public class GraphQlErrorHandler(IResolverContext context)
{
    private static IError BuildError(string message, ErrorCodes errorCode)
    {
        return ErrorBuilder
            .New()
            .SetMessage(message)
            .SetCode(errorCode.GetCode())
            .Build();
    }

    private void ReportNotFound()
    {
        context.ReportError(GraphQlErrorHandler.BuildError("no data found", ErrorCodes.NotFound));
    }

    public V? ValidateNotNull<T, V>(Optional<T> val, Func<T, V> accessor)
    {
        if (!val.HasValue) return default;
        
        var value = accessor(val.Value);
        if (value != null) return value;
        
        this.ReportNotFound();

        return default;
    }

    public void ReportIfError<T>(Result<T> result) where T : notnull
    {
        result.OnError(this.ReportError);
    }

    public void ReportError(TradeCityException err)
    {
        var error = ErrorBuilder
            .New()
            .SetMessage(err.Message)
            .SetCode(err.ErrorCode)
            .Build();
            
        context.ReportError(error);
    }
    
    public async Task<Result<T>> MakeGrpcRequest<T>(Func<Task<T>> callbackAsync) where T : notnull
    {
        try
        {
            return await callbackAsync();
        }
        catch (RpcException e)
        {
            var err = new TradeCityException(e.Status.Detail, e.GetInternalCode(), e);
            this.ReportError(err);
            return err;
        }
    }
}