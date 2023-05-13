var axios = require('axios');


(async () => {
var data = JSON.stringify({
  "pinataOptions": {
    "cidVersion": 1
  },
  "pinataMetadata": {
    "name": "test martin",
  },
  "pinataContent": {
    "somekey": "je suis mrtin la salope"
  }
});

var config = {
  method: 'post',
  url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer JWT-TOKEN'
    },
    data : data
  };

  const res = await axios(config);
  console.log(`JSON DATA:`);
  console.log(res.data);

  const test = await fetch (`https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`);
  console.log(`https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`);
  console.log(await test.text());
})()

