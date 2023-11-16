import moment from 'moment';
import { isNullOrEmpty } from '../validators/string.validation';

export const DateFormatted = (date: string) => {
    if (!isNullOrEmpty(date))
        return moment(date).format('DD/MM/YYYY');
    else
        return date;
}

export const HourFormatted = (date: string) => {
    return moment(date).format('hh:mm')
}

export const NumberFormatted = (text: string) => {
    return Number(text).toFixed(0)
}

export const NumberDecimalFormatted = (text: string | number | undefined) => {
    const fixed = Number(text).toFixed(3)
    return fixed.toString().replace('.', ',')
}