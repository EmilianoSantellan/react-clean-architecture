export const validateLetters = (value: any) => {
    const charsValues = /^[a-zA-Z\s]+$/;
    if (charsValues.exec(value)) {
        return value;
    }
    return value.slice(0, -1);
};