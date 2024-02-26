using Grpc.Core;
using TradeCity.Utilities.Error.Handling;

namespace TradeCity.Utilities.Error;

public static class Extensions
{
    public static string GetCode(this ErrorCodes errorCode)
    {
        return "TC" + (int)errorCode;
    }

    public static string GetInternalCode(this RpcException exception)
    {
        return exception.Trailers.GetValue(GrpcHandler.InternalErrorCodeKey) ?? "NO_CODE";
    }
}