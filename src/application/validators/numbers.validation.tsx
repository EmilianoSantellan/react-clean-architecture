export const validateNumbers = (value: any) => {
    const numbersValues = /^[0-9]*$/;
    if (numbersValues.exec(value)) {
        return value;
    }
    return value.slice(0, -1);
};

export const validateNumbersGreaterThanZero = (value: any) => {
    const numbersValues = /^[0-9]*$/;
    if (numbersValues.exec(value)) {
        if (value > 0) return value;
    }
    return value.slice(0, -1);
};

export const validateRealNumbers = (value: any) => {
    const a = /^[0-9]+([.])?$/;
    const b = /^[0-9]+([.][0-9]{1,4})?$/;
    if (a.exec(value)) {
        return value;
    } else
        if (b.exec(value)) {
            return value;
        }
    return value.slice(0, -1);
};

export const validateNumbersRange = (
    value: any,
    min: number = 1,
    max: number = 3
) => {
    const numbersValues = new RegExp('^[0-9]{' + min + ',' + max + '}$', 'g');

    if (numbersValues.exec(value)) {
        return value;
    }
    return value.slice(0, -1);
};

export const validateNumbersByLimit = (
    value: any,
    limit: number = 100
) => {
    const numbersValues = new RegExp('^([1-9][0-9]?|' + limit + ')$', 'g');

    if (numbersValues.exec(value)) {
        return value;
    }
    return value.slice(0, -1);
};

export const validateNumbersLetters = (value: any) => {
    const numbersValues = /^[a-zA-Z0-9\s]+$/;
    if (numbersValues.exec(value)) {
        return value;
    }
    return value.slice(0, -1);
};

export const isNumber = (value: any) => {
    return Number.isInteger(Number(value))
}