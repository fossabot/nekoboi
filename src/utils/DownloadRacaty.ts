import axios from "axios";
import cheerio from "cheerio";
import {createWriteStream} from "fs"
import { DownloadOption } from "./interfaces";
declare global {
    interface String {
        substringBefore(before : string) : string;
        substringAfter(before : string) : string;
    }
}

String.prototype.substringBefore = function(before:string) {
    return this.substring(0, this.indexOf(before));
  };
  
  String.prototype.substringAfter = function(after:string) {
    return this.substring(this.indexOf(after)+after.length, this.length);
  };

export async function extract(url:string) {
  url = url.replace(".com",".io").replace("http://","https://")
  const headers = {
    'referer': 'https://racaty.io',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36',
    'accept': 'application/json'
  };
  const payload = 'op=download2&id=' + url.replace("https://racaty.io/","") + '&rand=&referer=&method_free=&method_premium=';
  const response = await axios.post(url, payload, { headers });
  const $ = cheerio.load(response.data);
  const link = $('#uniqueExpirylink').attr('href')!.replace(' ', '%20');
  const name = /\/\/.*\/.*\/(.*)/.exec(link)![1];

  return { link, name };
}

export async function downloadRacaty(url:string,options:DownloadOption){
    const {data} = await axios.get(url,{
        responseType: "stream",
    })
    const writeStream = createWriteStream(`${options.fileName}`);
    
    data.pipe(writeStream);

    return data
}