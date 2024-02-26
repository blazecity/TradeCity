namespace TradeCity.Utilities.Functional;

public struct Result<T> where T: notnull
{
    private T? _okVal;
    private TradeCityException? _errVal;
    private bool _isOkay;

    public static Result<T> Ok(T val) => new()
    {
        _okVal = val,
        _isOkay = true
    };

    public static Result<T> Err(TradeCityException err) => new()
    {
        _errVal = err,
        _isOkay = false
    };

    public static implicit operator Result<T>(T val) => Ok(val);
    public static implicit operator Result<T>(TradeCityException err) => Err(err);

    public T UnwrapOr(Func<T> orFn) => this._okVal == null ? orFn() : this._okVal;

    public bool IsOk() => this._isOkay;

    public bool IsErr() => !this._isOkay;

    public A Match<A>(Func<T, A> onOk, Func<TradeCityException, A> onErr) => this._isOkay ? onOk(this._okVal!) : onErr(this._errVal!);
    
    public Result<T> Match(Func<T, Result<T>> onOk, Func<TradeCityException, Result<T>> onErr) => this._isOkay ? onOk(this._okVal!) : onErr(this._errVal!);

    public void OnError(Action<TradeCityException> callback)
    {
        if (this.IsErr()) callback(this._errVal!);
    }

    public void OnOk(Action<T> callback)
    {
        if (this.IsOk()) callback(this._okVal!);
    }

    public Option<T> ToOption() => this.IsOk() ? Option<T>.Some(this._okVal!) : Option<T>.None();
}

public struct Result
{
    public static Result<T> Ok<T>(T val) where T : notnull => Result<T>.Ok(val);

    public static Result<T> Err<T>(TradeCityException err) where T : notnull => Result<T>.Err(err);
}