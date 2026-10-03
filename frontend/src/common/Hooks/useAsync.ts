import { useEffect, useState } from "react";

export type AsyncState<T> = {
    data: T | null;
    loading: boolean;
    error: unknown;
};

type Settled<T> = { key: string; data: T | null; error: unknown };

/**
 * Runs `load` on mount and whenever `deps` change. `deps` must be primitives
 * (ids, filters), they're joined into a key that tags each result, so
 * `loading` is simply "the latest result isn't for the current key", and a
 * superseded request can never overwrite a newer one.
 */
export default function useAsync<T>(load: () => Promise<T>, deps: readonly unknown[]): AsyncState<T> {
    const key = deps.map(String).join("|");
    const [settled, setSettled] = useState<Settled<T> | null>(null);

    useEffect(() => {
        let cancelled = false;

        load()
            .then((data) => {
                if (!cancelled) setSettled({ key, data, error: null });
            })
            .catch((error: unknown) => {
                if (!cancelled) setSettled({ key, data: null, error });
            });

        return () => {
            cancelled = true;
        };
        // `key` captures deps; `load` is recreated every render by design.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    const current = settled?.key === key ? settled : null;

    return {
        data: current?.data ?? null,
        loading: current === null,
        error: current?.error ?? null,
    };
}
