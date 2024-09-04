"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obj = obj;
const splitter_1 = require("./splitter");
const arr_1 = require("./arr");
function obj(value) {
    value = value.trim().slice(1, -1).trim();
    let entries = value ? (0, splitter_1.splitter)(value, ',').map(e => {
        let [k, v] = (0, splitter_1.splitter)(e, ':').map(p => p.trim());
        if (k === undefined || k === '')
            throw new SKSError_1.default(`Please provide a valid key '${k}' in object`, 1006);
        if (v === undefined || v === '')
            throw new SKSError_1.default(`Please provide a valid value '${v}' for key '${k}' in object`, 1004);
        if (v.startsWith('{') && v.endsWith('}')) {
            v = obj(v);
        }
        else if (e?.startsWith('[') && e?.endsWith(']')) {
            v = (0, arr_1.arr)(e);
        }
        else if (/^\d+(\.\d+)?$/.test(v)) {
            v = parseFloat(v);
        }
        else if (['true', 'false'].includes(v.toLowerCase())) {
            v = v.toLowerCase() === 'true';
        }
        else if (['null', 'nil'].includes(v.toLowerCase())) {
            v = null;
        }
        else if (v.toLowerCase() === 'undefined') {
            v = undefined;
        }
        ;
        return [k, v];
    }) : [];
    return entries.length === 0 ? {} : Object.fromEntries(entries);
}
