const axios = require('axios');

async function updateData () {
  const [peak, pro] = await Promise.all([
    axios.get('https://api.dexscreener.io/latest/dex/pairs/metis/0x603e67714a1b910dccfdcae86dbec9467de16f4c'),
    axios.get('https://api.dexscreener.io/latest/dex/pairs/metis/0x9f881c2a9cf0ff6639a346b30ab6e663071cb4c1')
  ])

  Object.assign(module.exports, { peak: peak.data, pro: pro.data })
}

setInterval(updateData, 1000);

module.exports = {
  peak: null,
  pro: null
}
