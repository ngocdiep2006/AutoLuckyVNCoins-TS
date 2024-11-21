import {Builder, By, Key, until} from 'selenium-webdriver';
import {logoCenter} from './bin/logoCenter';
import fetch from 'node-fetch';
import {Options} from 'selenium-webdriver/chrome';

const logo = `

╔═══════════════════════════════════╗
║     Auto Collect Luckyvn Coins    ║
╚═══════════════════════════════════╝
   https://github.com/ngocdiep2006
            RELEASE-v1

`;

const BaseURL = "https://luckyvn.com/"

function wait(s: number) {
  return new Promise(resolve => setTimeout(resolve, s * 1000));
}

async function getTaskUrl(
  url: string,
  cookies: any,
) {
  try {
    const response = await fetch(url, {
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
  } catch (error) {
    console.error('Error fetching the URL:', error);
    return null;
  }
}

async function main(username: string, password: string) {
  logoCenter(logo);
  const options = new Options();
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
  const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  try {
    await driver.get(BaseURL + 'dang-nhap')
    await driver.wait(until.titleIs('Đăng nhập - Minecraft LuckyVN'), 9999)
    await driver.findElement(By.id('username-input')).sendKeys(username)
    await driver.findElement(By.id('password-input')).sendKeys(password)
    await driver.findElement(By.name('login')).click()
    await wait(1)
    const toastElement = driver.wait(until.elementLocated(By.css('div.toast')))
    const toastText = toastElement.getText()
    switch(await toastText) {
      case 'Tên đăng nhập không tồn tại!':
        console.log('Sai tên đăng nhập. Vui lòng kiểm tra lại tên đăng nhập và chạy lại script.')
        await driver.quit()
        process.exit(0)
      case 'Mật khẩu không chính xác!':
        console.log('Mật khẩu không chính xác. Vui lòng kiểm tra lại mật khẩu đăng nhập và chạy lại script')
        await driver.quit()
        process.exit(0)
      default:
        break
    }
    await driver.wait(until.titleIs('Minecraft Server VietNam - Máy Chủ Minecraft VN LuckyVN'))
    console.log('a')
    const session = await driver.manage().getCookie('session')
    const cookies = {
      'session': session.value
    }
    for (let i=1; i<5; i++) {
      let taskid = i
      let url = `${BaseURL}nhanxu?type=cnt&id=${taskid}`
      let taskURL = await getTaskUrl(url, cookies)
      console.log(taskURL)
      switch (await taskURL) {
        case 'nv_done':
          console.log(`Task ${taskid} done`)
          break
        default:
          console.log(`Task ${taskid} not done, please wait`)
      }
    }
  } catch(err) {
    throw err
  }
}


main('tunglamnoob','tunglamnoob')