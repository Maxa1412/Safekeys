"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SKSError = exports.format = exports.remove = exports.get = exports.has = exports.init = void 0;
const fs_1 = require("fs");
const line_1 = require("./addons/line");
const SKSError_1 = __importDefault(require("./addons/SKSError"));
exports.SKSError = SKSError_1.default;
const init = async (debug = false) => {
    try {
        const path = process.cwd() + '/.sks';
        const sksFile = await (0, fs_1.readFileSync)(path, 'utf8', (_, data) => data);
        const lines = (0, line_1.lineParser)(sksFile);
        let count = 0;
        let sks = {};
        for (let line of lines) {
            count++;
            if (!line)
                continue;
            let kvline = line.split('=');
            if (!kvline || kvline.length !== 2)
                throw new SKSError_1.default(`Syntax error ${path}`, 1002, path);
            let key = kvline[0];
            let value = kvline[1];
            if (key.includes(' '))
                throw new SKSError_1.default(`Invalid character used in ${count}:${key.indexOf(' ') + 1}`, 1003);
            if (!value)
                throw new SKSError_1.default(`Invalid value for SecretKey '${key}' at ${count}:${line.indexOf('=') + 1}`, 1004);
            let type = "String";
            if (/^\d+(\.\d+)?$/.test(value)) {
                value = parseFloat(value);
                type = "Integer";
            }
            else if (["true", "false"].includes(value.toLowerCase())) {
                value.toLowerCase() === "true" ? value = true : value = false;
                type = "Boolean";
            }
            ;
            if (debug === true) {
                console.log(`Loaded ${type} [${key}]`);
            }
            ;
            sks[key] = value;
        }
        ;
        process.sks = sks;
    }
    catch (err) {
        throw new SKSError_1.default(err?.message, err?.code, err?.path);
    }
};
exports.init = init;
const has = (key) => {
    return (!process.sks || process.sks[key] || process.sks[key] === 0) ? true : false;
};
exports.has = has;
const get = (key) => {
    return process.sks ? process.sks[key] : undefined;
};
exports.get = get;
const remove = (key) => {
    if (!process.sks)
        return false;
    return delete process.sks[key] ? true : false;
};
exports.remove = remove;
const format = (verify = false) => {
    return verify === true ? process.sks = {} : false;
};
exports.format = format;
