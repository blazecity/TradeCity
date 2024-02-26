using Grpc.Core;

namespace TradeCity.Utilities.Error.Handling;

public static class GrpcHandler
{
    public const string InternalErrorCodeKey = "internal_error_code";

    public static RpcException RpcException(StatusCode statusCode, string message, ErrorCodes errorCode)
    {
        
        return GrpcHandler.RpcException(statusCode, message, errorCode.GetCode());
    }

    public static RpcException RpcException(StatusCode statusCode, string message, string errorCode)
    {
        var metadata = new Metadata
        {
            { InternalErrorCodeKey, errorCode }
        };

        return new RpcException(new Status(statusCode, message), metadata);
    }
}