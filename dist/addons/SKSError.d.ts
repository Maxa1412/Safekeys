export default class SKSError extends Error {
    readonly code: number;
    readonly timestamp: Date;
    private line;
    private column;
    constructor(message?: string, code?: number, line?: number, column?: number);
    private _getFormattedError;
    log(): void;
}
