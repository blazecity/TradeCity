namespace TradeCity.Utilities.Functional;

public class TradeCityException(string message, string errorCode) : Exception
{
    public override string Message { get; } = message;
    public string ErrorCode { get; } = errorCode;
    public Exception? UnderlyingException { get; }

    public TradeCityException(string message, string errorCode, Exception underlyingException) : this(message, errorCode)
    {
        this.UnderlyingException = underlyingException;
    }
}