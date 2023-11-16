export const isNullOrEmpty = (value: string) => {
    if (value === null || value === undefined || value === '' || value?.length < 1) {
        return true;
    }

    return false;
}