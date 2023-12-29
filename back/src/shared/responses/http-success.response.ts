export class HttpSuccessResponse {
    public code: number;
    public payload?: any;

    constructor(code: number, payload?: any){
        this.code = code;
        this.payload = payload;
    }
}