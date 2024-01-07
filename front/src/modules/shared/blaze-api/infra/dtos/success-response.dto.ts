export class SuccessResponseDto<T> {
    public code: number;
    public payload?: any;

    constructor(code: number, payload?: T){
        this.code = code;
        this.payload = payload;
    }
}