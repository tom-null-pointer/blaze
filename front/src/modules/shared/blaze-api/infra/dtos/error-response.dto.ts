export class ErrorResponseDto<T> {
    code: number;
    error: string;
    message?: string;
    payload?: T;
    constructor(code: number, error: string, message?: string, payload?: T){
        this.code = code;
        this.error = error;
        this.message = message;
        this.payload = payload;
    }
}