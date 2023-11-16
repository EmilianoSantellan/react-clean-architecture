export default class Logger {
    static info(msg: string): void {
        console.info('%cINFO:', 'color: blue', msg);
    }

    static async success(msg: string, obj: any = {}): Promise<void> {
        console.info('%cSUCCESS:', 'color: green', msg);
    }

    static async warn(msg: string, obj: any = {}): Promise<void> {
        console.info(msg, obj);
        console.info('%WARN:', 'color: orange', msg);
    }

    static async error(msg: string, obj: any): Promise<void> {
        console.error(msg, obj);
    }
}