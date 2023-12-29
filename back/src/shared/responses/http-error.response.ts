export class HttpErrorResponse {
    code: number;
    error: string;
    message?: string;
    payload?: any;
    constructor(code: number, error: string, message?: string, payload?: any){
        this.code = code;
        this.error = error;
        this.message = message;
        this.payload = payload;
    }
}