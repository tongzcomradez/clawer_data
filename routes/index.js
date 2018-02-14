var express = require('express');
var router = express.Router();
var axios = require('axios')
const cheerio = require('cheerio')

/* GET home page. */
router.get('/', async function (req, res, next) {
  const arr = []
  for (let year = 2008; year <= 2012; year++) {
    for (let month = 1; month <= 12; month++) {
      for(let page = 1; page <= 10; page++) {
        try {
          const url = `https://www.songdee.com/${year.toString()}/${('0' + month).substr(-2)}/page/${page}`
          console.log(url)
          const { data } = await axios.get(url)
          const $ = cheerio.load(data)
          const containerData = $('div .bottom-archive').toArray()
          for (let i in containerData) {
            const originalSong = containerData[i].children[2].next.children[1].children[1].children[0].children[0].data.split('–')
            const cover_image = containerData[i].children[1].children[0].children[1].attribs.src
  
            arr.push({
              title: originalSong[0].trim(),
              artist: originalSong[1].trim(),
              cover_image
            })
          }
        }
        catch (e) { console.log(e) }
      }
    }
  }

  res.json(arr.length)
});

module.exports = router;
