import { Builder, By, Key, until } from 'selenium-webdriver';
import { logoCenter } from './bin/logoCenter'
import axios from 'axios'
import {detect} from "detect-browser"


const logo = `

╔═══════════════════════════════════╗
║     Auto Collect Luckyvn Coins    ║
╚═══════════════════════════════════╝
   https://github.com/ngocdiep2006
            RELEASE-v1

`

async function getTaskUrl(url: string, cookies: string): Promise<string | null> {
   try {
       const response = await axios.get(url, {
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
   } catch (error) {
       console.error('Error fetching the URL:', error);
       return null;
   }
}

async function main(username: string, password: string){
   
}

