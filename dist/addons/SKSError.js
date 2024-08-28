"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Colors_1 = __importDefault(require("./Colors"));
class SKSError extends Error {
    constructor(message = "An error occurred with the SKS file.", code = 1000, line = 0, column = 0) {
        super(message);
        this.name = "SKSError";
        this.code = code;
        this.timestamp = new Date();
        this.line = line;
        this.column = column;
    }
    _getFormattedError() {
        let { line, column } = this;
        let error = `${this.name} [${this.code}]: ${this.message} ${new Colors_1.default("(occurred at ").Yellow()}`;
        return error + new Colors_1.default(line && column ? `${line}:${column}` : `${this.timestamp?.toISOString()}`).Red() + new Colors_1.default(")").Yellow();
    }
    ;
    log() {
        console.error(this._getFormattedError());
    }
}
exports.default = SKSError;
