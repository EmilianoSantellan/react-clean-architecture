import { Observable, throwError, from } from 'rxjs';
import {
    // mergeMap, retryWhen, take, delay, 
    catchError,
} from 'rxjs/operators';
import { ERROR_FORBIDDEN, ERROR_TIMEOUT, ERROR_UNAUTHORIZED, ERROR_BAD_REQUEST, ERROR_INTERNAL_SERVER } from '../../application/common/globals';
import MSG from '../../application/common/messages';
import Log from '../../application/utils/logger';

const errorHandler = (err: any): Observable<any> => {
    let message = MSG.API.CONNECTION_ERROR;
    try {
        if (err === undefined) message = MSG.API.CONNECTION_ERROR;
        if (err && (err?.status === '0' || err?.status === 0 || err?.status === undefined)) message = MSG.API.CONNECTION_ERROR;
        if (err && err?.status === ERROR_TIMEOUT) message = MSG.API.TIMEOUT;
        if (err && err?.status === ERROR_FORBIDDEN) message = MSG.API.FORBIDDEN;
        if (err && err?.status === ERROR_UNAUTHORIZED) message = MSG.API.UNAUTHORIZED;
        if (err && err?.status === ERROR_BAD_REQUEST) message = MSG.API.BAD_REQUEST;
        if (err && err?.status === ERROR_INTERNAL_SERVER) message = MSG.API.INTERNAL_ERROR;
        Log.error('API ERROR \n', err);
        return throwError(message);
    } catch (error) {
        Log.error('ERROR CATCH API', err);
        return throwError(message);
    }
}

/**
 * This takes in a promise and convert to an observable
 * then makes the api request, it tries the api call 2 times only if failed
 * before responding to the caller.
 * @param apiCaller
 * @returns {Observable<*>}
 */
export function processApiRequest(apiCaller: any): Observable<any> {
    return from(apiCaller).pipe(
        // retryWhen((errors) => errors.pipe(
        //     mergeMap((err) => errorHandler(err.response)),
        //     delay(1000),
        //     take(2),
        // )),
        catchError((err) => errorHandler(err.response)),
        // map((res) => {
        //     res
        // }),
    );
}

export function createRequestBody(data: any): string {
    const keys = Object.keys(data);
    const formBody = keys.map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    return formBody.join("&");
}