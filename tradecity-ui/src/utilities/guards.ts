export type GuardFn = () => boolean;

export class Guards {
    private readonly _guards: Array<GuardFn>;

    private constructor(...guards: Array<GuardFn>) {
        this._guards = guards;
    }

    public static guard(...guards: Array<GuardFn>): boolean {
        for (const guardFn of guards) {
            if (!guardFn()) return false;
        }

        return true;
    }

    static create(...guards: Array<GuardFn>): Guards {
        return new Guards(...guards);
    }

    public guard(): boolean {
        return Guards.guard(...this._guards);
    }
}

