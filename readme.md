# Nekoboi
Original Repository : <a href="https://github.com/MoonLGH/nekoWrap">@MoonLGH/NekoWrap</a></br>
Real Note : You fr can get ip banned from neko by using this, i'm not responsible for that</br>
another note for muslim user + indonesian : Dosa tanggung sendiri ya👍

## TODO

[✓] Change Zippyshare To Racaty Download</br>
[✓] Implement Genres </br>
[] Add more examples </br>

## Install

```
npm install nekoboi
```

## Example
All example can be looked from /Example, its using ts deal with it.


## Interface Refrences
Interfaces for what each method returns can be founded in [src/utils/interfaces.ts](https://github.com/wffzy/nekoboi/blob/main/src/utils/interfaces.ts)

## Example

```ts
// Import the package

const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const { Client } = require("nekoboi");

// Or in esm
import { Client } from "nekoboi";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());

(async ()=>{
  const client = new Client(puppeteer, {args: ['--no-sandbox', '--disable-setuid-sandbox']});
  await client.start();
    // Do afterward functions
})();
```

## Functions API
? means optional on parameter </br>
Default value for optional Pages are 1

```ts

// Get latest update
async function release() {
    const res = await client.release(Page?)
    console.log(res)
    // Returns : AnimeShort[]
}

// Get Hentai Page
async function hentai() {
    const res = await client.hentai(Page?)
    console.log(res)
    // Returns : AnimeShort[]
}

async function search() {
    const res = await client.search("Isekai harem monogatari",Page?)
    console.log(res)
    // Returns : AnimeShort[]
}

// Fetch Hentai From ID
async function fetchHentai() {
    const res = await client.fetchHentai("isekai-harem-monogatari/",Page?)
    console.log(res)
    // Returns : HentaiObject
}

async function fetchEpisode() {
    let eps = await client.fetchEpisode("isekai-harem-monogatari-episode-2-subtitle-indonesia/")
    console.log(res)
    // Returns : Download
}

// Bypass Ouo
async function Ouo() {
    const res = await client.Ouo("https://ouo.io/C4s5Gdg")
    console.log(res)
    // Expected output : String
}

// Mirror Bypass
async function Mirror() {
    const res = await client.Mirror("https://www.mirrored.to/files/4YPX8MZW/[NekoPoi]_Isekai_Harem_Monogatari_-_01_[720P][nekopoi.care].mp4_links")
    console.log(res)
    // Returns : Mirror[]
}

// Racaty Bypass
async function parseRacaty(){
    let {link,name} = await client.parseRacaty("https://racaty.com/5p7mglv5k4vx")
    
    console.log(link)
    // Expected output : String
    // Get Name File
    console.log(name)
    // Expected output : String
}

// Download Racaty
async function downloadRacaty(){
    // Combine With parseRacaty
    const res = await downloadRacaty(link, { fileName: name })
    // Expected output : mp4
}


// Close Puppeter
async function close(){
    await client.close()
    // Expected : puppeteer.close() or process.exit() 
}

```


## Full Example 
```javascript
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
const { Client } = require("nekoboi");
(async ()=>{
  const client = new Client(puppeteer, {args: ['--no-sandbox', '--disable-setuid-sandbox']});
  await client.start();
  let res1 = await client.search("Isekai Harem Monogatari")
  let res = await client.genre("yuri")
  // console.log(res)
  console.log(res)
  for (let i = 0; i < res.length; i++) {
    const element = res[i];
    if(element.type ==="hentai"){
      let hentaiFull = await client.fetchHentai(element.id)
      let eps = (await client.fetchEpisode(hentaiFull.episodeList[0].id))[0].list
      console.log(eps)
      for (let i = 0; i < eps.length; i++) {
        const element = eps[i];
        if(element.provider.includes("ouo")){
          let url = await client.Ouo(element.link)
          let url2 = await client.Ouo(element.link,2)
          console.log("OUO [ "+url+" ]")
          console.log("OUO2 [ "+url2+" ]")
          url = url+""
          const downloads = await client.bypassMirrored(url!)
          console.log(`this downloads: ${downloads}`)
          let zs = downloads.find(ar => ar.host.toLowerCase().includes("zippy"))?.url
          console.log(`this zs ${zs}`)
          if(!zs) return
          let {link,name} = await client.parseZippy(zs!)
          console.log(`this link : ${link} \nThis Name : ${name}`)
          const data = await client.downloadZippy(link,{fileName:name})
          // data.on("data",(chunk:Buffer)=>{
          // })
          data.on("end",()=>{
            console.log("end")
          })
        }
      }
    }
  }
  client.close();
})();
```
