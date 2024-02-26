export class TradeCityException {

    public static create(message: string, errorCode: string): TradeCityException {
        return new TradeCityException(message, errorCode);
    }

    constructor(public message: string, public errorCode: string) {}
}

type ResultInternals<T> = {
    okValue?: T,
    errValue?: TradeCityException,
    isOkay: boolean
}

type OkCallback<T, A> = (ok: T) => A;
type ErrCallback<A> = (err: TradeCityException) => A;

export class Result<T> {

    private _internals: ResultInternals<T>;

    private constructor(internals: ResultInternals<T>) {
        this._internals = internals;
    }

    public static Ok<T>(val: T): Result<T> {
        return new Result({
            okValue: val,
            isOkay: true
        });
    }

    public static Err<T>(err: TradeCityException): Result<T> {
        return new Result<T>({
            errValue: err,
            isOkay: false
        });
    }

    public match<A>(onOk: OkCallback<T, A>, onErr: ErrCallback<A>) {
        return this._internals.isOkay ? onOk(this._internals.okValue!) : onErr(this._internals.errValue!);
    }

    public isOk(): boolean {
        return this._internals.isOkay;
    }

    public isErr(): boolean {
        return !this._internals.isOkay;
    }

    public unwrapOr(callback: () => T): T {
        if (this._internals.isOkay) return this._internals.okValue!;

        return callback();
    }
}

export class Option<T> {
    private _someValue?: T;
    private _isSome: boolean = false;

    private constructor(val?: T) {
        this._someValue = val;
        this._isSome = !!val;
    }

    public static Some<T>(val: T): Option<T> {
        return new Option<T>(val);
    }

    public static None<T>(): Option<T> {
        return new Option<T>();
    }

    public isSome(): boolean {
        return this._isSome;
    }

    public isNone(): boolean {
        return !this._isSome;
    }

    public match<A>(someCallback: (val: T) => A, noneCallback: () => A): A {
        return this._isSome ? someCallback(this._someValue!) : noneCallback();
    }

    public unwrapOr(callback: () => T): T {
        return this._isSome ? this._someValue! : callback();
    }
}