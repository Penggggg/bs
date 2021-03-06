"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCtx = function (ctx) {
    ctx.set(Object.assign({
        'Content-Type': 'application/json'
    }, process.env.NODE_ENV === 'development' ? { 'Access-Control-Allow-Origin': '*' } : {}));
};
