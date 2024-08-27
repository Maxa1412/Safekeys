"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SKSError extends Error {
    constructor(message = "An error occurred with the SKS file.", code = 1001, path = "./") {
        super(message);
        this.name = "SKSError";
        this.code = code;
        this.timestamp = new Date();
        this.path ??= path;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, SKSError);
        }
    }
    getFormattedError() {
        return `${this.name} [${this.code}]: ${this.message} (occurred at ${this.timestamp?.toISOString()})`;
    }
    logError() {
        console.error(this.getFormattedError());
    }
}
exports.default = SKSError;
