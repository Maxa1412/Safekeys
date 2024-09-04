"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arr = arr;
const splitter_1 = require("./splitter");
const obj_1 = require("./obj");
function arr(value) {
    value = value.trim().slice(1, -1).trim();
    let entries = value ? (0, splitter_1.splitter)(value, ',').map(e => {
        e = e.trim();
        if (e === undefined)
            return undefined;
        if (e?.startsWith('[') && e?.endsWith(']')) {
            return arr(e);
        }
        else if (e.startsWith('{') && e.endsWith('}')) {
            return (0, obj_1.obj)(e);
        }
        else if (/^\d+(\.\d+)?$/.test(e)) {
            return parseFloat(e);
        }
        else if (['true', 'false'].includes(e.toLowerCase())) {
            return e.toLowerCase() === 'true';
        }
        else if (['null', 'nil'].includes(e.toLowerCase())) {
            return null;
        }
        else if (e.toLowerCase() === 'undefined') {
            return undefined;
        }
        return e;
    }) : [];
    return entries;
}
;
