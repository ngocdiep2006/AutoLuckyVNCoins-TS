"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const detect_browser_1 = require("detect-browser");
const logo = `

╔═══════════════════════════════════╗
║     Auto Collect Luckyvn Coins    ║
╚═══════════════════════════════════╝
   https://github.com/ngocdiep2006
            RELEASE-v1

`;
async function getTaskUrl(url, cookies) {
    try {
        const response = await axios_1.default.get(url, {
            headers: {
                'Cookie': cookies
            }
        });
        if (response.data.includes('nv_done')) {
            return 'nv_done';
        }
        const parsedUrl = new URL(response.data);
        const queryParams = new URLSearchParams(parsedUrl.search);
        if (queryParams.has('url')) {
            return queryParams.get('url');
        }
        return null;
    }
    catch (error) {
        console.error('Error fetching the URL:', error);
        return null;
    }
}
async function main(username, password) {
}
function test() {
    const browser = (0, detect_browser_1.detect)();
    console.log(browser);
}
test();
//# sourceMappingURL=index.js.map