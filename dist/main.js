"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Errors = exports.Colors = exports.SKSWarn = exports.SKSError = exports.add = exports.format = exports.remove = exports.get = exports.has = exports.init = void 0;
const fs_1 = require("fs");
const line_1 = require("./addons/line");
const SKSError_1 = __importDefault(require("./addons/SKSError"));
exports.SKSError = SKSError_1.default;
const SKSWarn_1 = __importDefault(require("./addons/SKSWarn"));
exports.SKSWarn = SKSWarn_1.default;
const Colors_1 = __importDefault(require("./addons/Colors"));
exports.Colors = Colors_1.default;
const unusal = new Set(' *$&;:\'"?/\\#');
let DEBUG = false;
const init = async (debug = false) => {
    try {
        const path = process.cwd() + '/.sks';
        const sksFile = await (0, fs_1.readFileSync)(path, 'utf8');
        const lines = (0, line_1.lineParser)(sksFile);
        let count = 0;
        let sks = {};
        if (debug === true)
            DEBUG = true;
        for (let line of lines) {
            count++;
            if (!line || line.startsWith('#'))
                continue;
            let kvline = line.split('=');
            if (!kvline || kvline.length < 2)
                throw new SKSError_1.default(`Syntax error ${path}`, 1002);
            let key = kvline[0];
            let value;
            if (key.includes(' '))
                throw new SKSError_1.default(`Invalid character used in ${count}:${key.indexOf(' ') + 1}`, 1003);
            if (sks[key] && DEBUG === true)
                new SKSWarn_1.default(2001, { key: key, line: count, column: line.indexOf('=') }).log();
            let type = new Colors_1.default("String").Orange();
            if (kvline.length === 2 && kvline[1].split(' ')?.[0] === 'type') {
                switch (kvline[1].split(' ')?.[1].toLowerCase()) {
                    case 'string':
                    case 'str':
                        value = String;
                        type = "typeof " + new Colors_1.default("String").Blue();
                        break;
                    case 'integer':
                    case 'float':
                    case 'number':
                        value = Number;
                        type = "typeof " + new Colors_1.default("Number").Blue();
                        break;
                    case 'boolean':
                    case 'bool':
                        value = Boolean;
                        type = "typeof " + new Colors_1.default("Boolean").Blue();
                        break;
                    default:
                        throw new SKSError_1.default(`Invalid 'type' used for SecretKey '${key}' at ${count}:${line.indexOf('=') + 1}`, 1005);
                        break;
                }
                ;
            }
            else {
                value = kvline.length > 2 ? kvline.slice(1).join('=') : kvline[1];
                let splitValue = value.split(' ');
                splitValue.forEach((v, i) => {
                    if (v?.startsWith('#')) {
                        value = splitValue.slice(0, i).join(' ');
                    }
                });
                if (/^\d+(\.\d+)?$/.test(value)) {
                    value = parseFloat(value);
                    type = (Number.isFinite(value) && !Number.isInteger(value) && (value % 1 !== 0) ? new Colors_1.default("Float") : new Colors_1.default("Integer")).Orange();
                }
                else if (["true", "false"].includes(value.toLowerCase())) {
                    value.toLowerCase() === "true" ? value = true : value = false;
                    type = new Colors_1.default("Boolean").Orange();
                }
                else if (['null', 'undefined', 'NaN'].includes(value)) {
                    switch (value) {
                        case 'null':
                            value = null;
                            break;
                        case 'undefined':
                            value = undefined;
                            break;
                        case 'NaN':
                            value = NaN;
                            break;
                    }
                    ;
                    type = new Colors_1.default("Never").Orange();
                }
                else if (value === '{}' || (value.startsWith('{') && value.endsWith('}'))) {
                    try {
                        value = JSON.parse(value);
                    }
                    catch {
                        value = value;
                    }
                    type = new Colors_1.default("Object").Cyan();
                }
                else if (value === '[]' || (value.startsWith('[') && value.endsWith(']'))) {
                    try {
                        value = JSON.parse(value);
                    }
                    catch {
                        value = value;
                    }
                    type = new Colors_1.default("Array").Cyan();
                }
                ;
            }
            ;
            if (!value && ![false, 0, null, undefined, NaN, {}, []].includes(value))
                throw new SKSError_1.default(`Invalid value for SecretKey '${key}' at ${count}:${line.indexOf('=') + 1}`, 1004);
            if (value) {
                for (let char of Array.from(value)) {
                    if (type.startsWith('typeof'))
                        break;
                    if (unusal.has(char)) {
                        new SKSWarn_1.default(2002, { key: key, line: count, column: key.length + value.indexOf(char) + 2 }).log();
                        break;
                    }
                }
                ;
            }
            ;
            for (let char of Array.from(key)) {
                if (unusal.has(char)) {
                    new SKSWarn_1.default(2004, { key: key, line: count, column: key.indexOf(char) + 2 }).log();
                    break;
                }
            }
            ;
            if (!sks[key] && debug === true)
                console.log(`Loaded ${type} [${new Colors_1.default(key).Purple()}]`);
            sks[key] = value;
        }
        ;
        process.sks = sks;
        if (DEBUG === true)
            console.log(new Colors_1.default("Successfully loaded SKS.").Green());
    }
    catch (err) {
        console.error(err);
    }
    ;
};
exports.init = init;
const save = (sks = {}) => {
    process.sks = sks;
};
const has = (key) => {
    return (!process.sks || process.sks[key] || process.sks[key] === 0) ? true : false;
};
exports.has = has;
const get = (key) => {
    return process.sks ? process.sks[key] : undefined;
};
exports.get = get;
const remove = (key) => {
    if (!process.sks || !process.sks[key])
        return false;
    return delete process.sks[key] ? true : false;
};
exports.remove = remove;
const format = (verify = false) => {
    return verify === true ? process.sks = {} : false;
};
exports.format = format;
const add = (name, key, value) => {
    if (!name && typeof name !== 'string')
        throw new SKSError_1.default(`Please provide a valid object/array name '${name}'`, 1009);
    if (!key)
        throw new SKSError_1.default(`Please provide a valid key '${key}'`, 1006);
    if (!process.sks || !process.sks.hasOwnProperty(name))
        throw new SKSError_1.default(`The key '${name}' has not found`, 1007);
    if (!value && ![false, 0, null, undefined, NaN, {}, []].includes(value) && !Array.isArray(process.sks[name]))
        throw new SKSError_1.default(`Please provide a valid value '${value}'`, 1004);
    if (Array.isArray(process.sks[name])) {
        process.sks[name].push(key);
    }
    else if (typeof process.sks[name] === 'object') {
        process.sks[name][key] = value;
    }
    else {
        throw new SKSError_1.default(`Cannot add '${typeof key}' to '${typeof process.sks[name]}'`, 1008);
    }
    ;
    save(process.sks);
};
exports.add = add;
var ErrorsCat_1 = require("./addons/ErrorsCat");
Object.defineProperty(exports, "Errors", { enumerable: true, get: function () { return ErrorsCat_1.ErrorsCat; } });
