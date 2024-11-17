"use strict";
/**
 * logoCenter.ts - Căn logo, văn bản ra giữa console
 * Viết bởi ngocdiep2006
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoCenter = void 0;
function logoCenter(logo) {
    const lines = logo.split('\n');
    const terminalWidth = process.stdout.columns;
    const longestLineLength = Math.max(...lines.map(line => line.length));
    const padding = Math.floor((terminalWidth - longestLineLength) / 2);
    lines.forEach(line => {
        console.log(' '.repeat(padding) + line);
    });
}
exports.logoCenter = logoCenter;
//# sourceMappingURL=logoCenter.js.map