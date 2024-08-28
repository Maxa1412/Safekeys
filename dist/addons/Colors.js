"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Colors {
    constructor(text) {
        this.text = text;
    }
    _applyColor(code) {
        return `\x1b[${code}m${this.text}\x1b[0m`;
    }
    Red() {
        return this._applyColor(31);
    }
    Yellow() {
        return this._applyColor(33);
    }
    Green() {
        return this._applyColor(32);
    }
    Blue() {
        return this._applyColor(34);
    }
    Orange() {
        return this._applyColor('38;5;208');
    }
    Cyan() {
        return this._applyColor(36);
    }
    Purple() {
        return this._applyColor('38;5;129');
    }
}
exports.default = Colors;
;
