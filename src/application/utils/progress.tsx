export const allProgressNumber = (proms: Promise<any>[], handle?: (p: number) => void, progress?: number): void => {
    let completed = progress ? progress : 0;

    proms.forEach((promise) => {
        promise.then(() => {
            completed++;
            if (handle)
                handle((completed / proms.length) * 100);
        });
    });
}
