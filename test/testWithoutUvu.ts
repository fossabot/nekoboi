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