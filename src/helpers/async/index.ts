import { Defer } from "../../types";

export const createDefer = <T>() => {
    const defer: Defer<T> = {
        promise: null,
        resolve: (val?: T) => {},
        reject: (err: any) => {},
        reset() {
            defer.promise = new Promise((resolve, reject) => {
                defer.resolve = (val?: T) => {
                    resolve(val as T);
                };
                defer.reject = (err: Error) => {
                    reject(err);
                };
            });
        },
    };

    defer.reset();

    return defer;
};
