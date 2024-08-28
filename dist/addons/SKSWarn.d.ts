interface Data {
    key: string;
    value: any;
    line: number;
    column: number;
}
export default class SKSWarn {
    code: string | number;
    message: string;
    data: Data;
    constructor(code: string | number, data: Data);
    private _message;
    log(): void;
}
export {};
