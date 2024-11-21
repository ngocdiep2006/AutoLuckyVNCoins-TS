"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const selenium_webdriver_1 = require("selenium-webdriver");
const logoCenter_1 = require("./bin/logoCenter");
const node_fetch_1 = require("node-fetch");
const chrome_1 = require("selenium-webdriver/chrome");
const logo = `

╔═══════════════════════════════════╗
║     Auto Collect Luckyvn Coins    ║
╚═══════════════════════════════════╝
   https://github.com/ngocdiep2006
            RELEASE-v1

`;
const BaseURL = "https://luckyvn.com/";
function wait(s) {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
}
async function getTaskUrl(url, cookies) {
    try {
        const response = await (0, node_fetch_1.default)(url, {
            method: 'GET',
            headers: {
                'Cookie': cookies,
            },
        });
        if (!response.ok) {
            console.error('Error fetching the URL:', response.statusText);
            return null;
        }
        const data = await response.text();
        if (data.includes('nv_done')) {
            return 'nv_done';
        }
        const parsedUrl = new URL(data);
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
    (0, logoCenter_1.logoCenter)(logo);
    const options = new chrome_1.Options();
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-infobars');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--disable-blink-features=AutomationControlled');
    options.addArguments('--disable-logging');
    options.addArguments('--disable-extensions');
    options.setUserPreferences({
        'profile.default_content_setting_values.notifications': 2,
    });
    options.addArguments('--enable-automation');
    options.addArguments('--useAutomationExtension: "false"');
    const driver = await new selenium_webdriver_1.Builder().forBrowser('chrome').setChromeOptions(options).build();
    try {
        await driver.get(BaseURL + 'dang-nhap');
        await driver.wait(selenium_webdriver_1.until.titleIs('Đăng nhập - Minecraft LuckyVN'), 9999);
        await driver.findElement(selenium_webdriver_1.By.id('username-input')).sendKeys(username);
        await driver.findElement(selenium_webdriver_1.By.id('password-input')).sendKeys(password);
        await driver.findElement(selenium_webdriver_1.By.name('login')).click();
        await wait(1);
        const toastElement = driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.css('div.toast')));
        const toastText = toastElement.getText();
        switch (await toastText) {
            case 'Tên đăng nhập không tồn tại!':
                console.log('Sai tên đăng nhập. Vui lòng kiểm tra lại tên đăng nhập và chạy lại script.');
                await driver.quit();
                process.exit(0);
            case 'Mật khẩu không chính xác!':
                console.log('Mật khẩu không chính xác. Vui lòng kiểm tra lại mật khẩu đăng nhập và chạy lại script');
                await driver.quit();
                process.exit(0);
            default:
                break;
        }
        await driver.wait(selenium_webdriver_1.until.titleIs('Minecraft Server VietNam - Máy Chủ Minecraft VN LuckyVN'));
        console.log('a');
        const session = await driver.manage().getCookie('session');
        const cookies = {
            'session': session.value
        };
        for (let i = 1; i < 5; i++) {
            let taskid = i;
            let url = `${BaseURL}nhanxu?type=cnt&id=${taskid}`;
            let taskURL = await getTaskUrl(url, cookies);
            console.log(taskURL);
            switch (await taskURL) {
                case 'nv_done':
                    console.log(`Task ${taskid} done`);
                    break;
                default:
                    console.log(`Task ${taskid} not done, please wait`);
            }
        }
    }
    catch (err) {
        throw err;
    }
}
main('tunglamnoob', 'tunglamnoob');
//# sourceMappingURL=index.js.map