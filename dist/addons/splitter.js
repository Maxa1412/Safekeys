"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitter = splitter;
function splitter(str, char) {
    let result = [];
    let current = '';
    let depth = 0;
    for (let i = 0; i < str.length; i++) {
        let c = str[i];
        if (c === '{' || c === '[') {
            depth++;
        }
        else if (c === '}' || c === ']') {
            depth--;
        }
        else if (c === char && depth === 0) {
            result.push(current.trim());
            current = '';
            continue;
        }
        current += c;
    }
    if (current) {
        result.push(current.trim());
    }
    return result;
}
