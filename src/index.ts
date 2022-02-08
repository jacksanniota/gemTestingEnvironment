import express, { response } from 'express';
// import fetch from 'node-fetch';
const fetch = require("node-fetch");
// import fetch from 'node-fetch';

const app = express();
const port = 3000;

import { getSingleGemAsset, getGemContract, getGemAssets } from "./api/getGemAssests"

app.get('/', (req, res) => {
  const collectionAddress = "0xc84cc1111adace071e2a57a61c42450d4e133f16";
  // const collectionAddress = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";

  //test individual asset

  // getSingleGemAsset(
  //   {
  //     contractAddress: collectionAddress, tokenId: "4900"
  //   }).then((response) =>
  //     // res.send(response)
  //     console.log(response.data)
  //   );
  
  
  // interface NFTDataSet extends Array<NFTData>{ }
  
  var item1: GemNFTData = {
    imageUrl: null,
    tokenId: 4999,
    contractAddress: collectionAddress,
    _id: 1
  }

  var item2: GemNFTData = {
    imageUrl: null,
    tokenId: 5000,
    contractAddress: collectionAddress,
    _id: 1
  }
  let testNFTData = new Array<GemNFTData>(item1, item2)
  
   //test group assets

  getGemAssets(testNFTData).then((response) =>
    console.log(response)
  );

  //test collection data

  // getGemContract(collectionAddress).then((response) =>
  //   // res.send(response)
  //   console.log(response)
  // );
  // console.log(getGemAsset(collectionAddress, "1"));
  res.send("Hello World");
  // res.send(await getGemAsset(collectionAddress, "1"));
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
