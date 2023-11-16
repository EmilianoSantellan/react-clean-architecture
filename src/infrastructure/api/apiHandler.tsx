import axios from 'axios';
import { Observable } from 'rxjs';
import { API_BASE_URL, TIMEOUT_DURATION } from '../../application/common/globals';
import { processApiRequest } from './utils';

async function handleRequest(req: any) {
    //TODO: BUSCAR TOKEN EN EL STORAGE O COOKIE
    // const authToken = '';
    req.headers.Accept = 'application/json';
    // req.headers.Authorization = `Bearer ${authToken?.access_token}`
    return req;
}

/**
 * This is used to modify the header request and relies on some header constraints
 * to generate some header fields
 */
axios.interceptors.request.use(
    async (req: any) => await handleRequest(req),
    (error) => Promise.reject(error),
);

/** *
 * The ApiHandler framework with observable
 */
export default class ApiHandler {

    static post(url: string, data: any, options?: any): Observable<any> {
        console.info("POST: ", options && options.fullPath ? url : API_BASE_URL + url);
        return processApiRequest(
            axios.post(
                options && options.fullPath ? url : API_BASE_URL + url,
                data,
                { timeout: TIMEOUT_DURATION, headers: options ? options : {} },
            ),
        )
    }

    static put(url: string, data: any, options?: any): Observable<any> {
        console.info("PUT: ", options && options.fullPath ? url : API_BASE_URL + url);
        return processApiRequest(
            axios.put(
                options && options.fullPath ? url : API_BASE_URL + url,
                data,
                { timeout: TIMEOUT_DURATION, headers: options ? options : {} },
            ),
        )
    }

    static delete(url: string, options?: any, data?: any): Observable<any> {
        data = data ? (data instanceof Object && !Object.keys(data).length ? null : data) : null;
        const config = data
            ? { headers: options, data, timeout: TIMEOUT_DURATION }
            : { headers: options, data: '', timeout: TIMEOUT_DURATION };
        return processApiRequest(
            axios.delete(options && options.fullPath ? url : API_BASE_URL + url, config),
        );
    }

    static get(url: string, options?: any, data?: any): Observable<any> {
        data = data ? (data instanceof Object && !Object.keys(data).length ? null : data) : null;
        const config = data
            ? { headers: options, data, timeout: TIMEOUT_DURATION }
            : { headers: options, data: '', timeout: TIMEOUT_DURATION };

        console.info("GET: ", options && options.fullPath ? url : API_BASE_URL + url);
        return processApiRequest(
            axios.get(options && options.fullPath ? url : API_BASE_URL + url, config),
        );
    }

    static head(path: string): Observable<void> {
        return processApiRequest(
            axios.head(API_BASE_URL + path, { timeout: 5000 })
        );
    }
};