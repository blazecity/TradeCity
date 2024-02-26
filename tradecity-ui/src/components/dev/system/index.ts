export interface StatusDescription {
    color: string;
    dotColor: string;
}

export const status = {
    ok: { color: "text-green-200", dotColor: "text-green-500" },
    nok: { color: "text-red-200", dotColor: "text-red-500" },
    semiOk: { color: "text-orange-200", dotColor: "text-orange-500" },
    unknown: { color: "text-white", dotColor: "text-white" }
};