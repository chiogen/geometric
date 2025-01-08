
export function* iterateReverse<T>(list: readonly T[]): Generator<T> {
    for (let i = list.length - 1; i >= 0; i--)
        yield list[i];
}