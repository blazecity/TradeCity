namespace TradeCity.Utilities.Functional;

public struct Option<T>
{
    private T _someVal;
    private bool _isSome;

    public static Option<T> Some(T value) => new()
    {
        _someVal = value,
        _isSome = true
    };

    public static Option<T> None() => new()
    {
        _isSome = false
    };

    public static implicit operator Option<T>(T val) => Some(val);

    public bool IsSome() => this._isSome;

    public bool IsNone() => !this._isSome;

    public TA Match<TA>(Func<T, TA> someFn, Func<TA> noneFn) => this._isSome ? someFn(this._someVal) : noneFn();
    
    public void OnNone(Action callback)
    {
        if (!this._isSome) callback();
    }

    public void OnSome(Action<T> callback)
    {
        if (this._isSome) callback(this._someVal);
    }

    public T UnwrapOr(Func<T> callback) => this._isSome ? _someVal : callback();
}

public struct Option
{
    public static Option<T> Some<T>(T value) => Option<T>.Some(value);
    public static Option<T> None<T>() => Option<T>.None();
}