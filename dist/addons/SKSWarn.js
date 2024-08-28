"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Colors_1 = __importDefault(require("./Colors"));
class SKSWarn {
    constructor(code, data) {
        this.code = code;
        this.data = data;
        this.message = this._message();
    }
    ;
    _message() {
        const { key, value, line, column } = this.data;
        switch (this.code?.toString() || this.code) {
            case "2001":
                return `The key '${key}' is duplicated at ${line}:${column}`;
            case "2002":
                return `Detected unusual characters for key '${key}' at ${line}:${column}; consider validating your input.`;
            case "2003":
                return `The value '${value}' may not be appropriate for the given key.`;
            case "2004":
                return `Key '${key}' at ${line}:${column} might be incorrect or improperly formatted.`;
            case "2005":
                return `Verify the key '${key}' at ${line}:${column} is present and spelled correctly.`;
            case "2006":
                return "Potential conflict detected in the SKS structure, review the hierarchy.";
            default:
                return "An unidentified warning has occurred.";
        }
    }
    ;
    log() {
        const message = new Colors_1.default(`Warning [${this.code}]: ${this.message}`).Yellow();
        console.log(message);
    }
    ;
}
exports.default = SKSWarn;
