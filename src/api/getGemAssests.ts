
import axios, { AxiosRequestConfig } from "axios";
const fetch = require("node-fetch");

// Support for asset calling

interface IGetSingleGemAsset {
  tokenId: number | string;
  contractAddress: string;
}

interface ISingleGemAssetStruct {
    filters: object;
    sort: object;
    fields: object;
    offset: number;
    markets: Array<String>;
    limit: number;
    status: Array<String>;
}
 
export const getAssetsReqBody = (
  contractAddress: string,
  offset = 0,
  limit = 100,
  tokenId: string | number,
  buyNow = false
): ISingleGemAssetStruct => ({
  filters: {
    traits: {},
    traitsRange: {},
    searchText: tokenId,
    address: contractAddress,
    price: {},
  },
  sort: {
    currentEthPrice: 'asc',
  },
  // sort: {},
    fields: {
    id: 1,
    address: 1,
    tokenId: 1,
    name: 1,
    imageUrl: 1,
  },
  offset,
  limit,
  markets: [],
  status: [buyNow ? 'buy_now' : 'all'],
});
 
 
const GEM_API_BASE_URL = 'https://gem-public-api.herokuapp.com';

export const getGemAssets = async (items: Array<GemNFTData>): Promise<SingleGemAssetResults[]> => {
  return Promise.all(items.map(nft => getSingleGemAsset({contractAddress: nft.contractAddress, tokenId: nft.tokenId })));
};

//This function returns the json output instead of a promise of a gem api call for a single asset

// export const getGemAsset = async (contractAddress: string, tokenId: string): Promise<IGetSingleGemAsset> => {
//   // eslint-disable-next-line no-return-await
//   const gemRes: { data: IGetSingleGemAsset[] } = await fetch(`${GEM_API_BASE_URL}/assets`, {
//     method: 'POST',
//     body: JSON.stringify({
//       ...getAssetsReqBody(contractAddress, 0, 1, tokenId),
//     }),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     // .then(res => res.json());
//   // return gemRes?.data[0];
//   return gemRes.data[0];
// };


//This function returns a promise of data from gemAPI on requested tokenId. Set up to follow current OS structure

export function getSingleGemAsset({ contractAddress, tokenId }: IGetSingleGemAsset): Promise<SingleGemAssetResults>{
  const filters = JSON.stringify({
    ...getAssetsReqBody(contractAddress, 0, 1, tokenId),
  })
  // eslint-disable-next-line no-return-await
  const gemRes = axios.post(`${GEM_API_BASE_URL}/assets`, filters, {
    headers: {
      'Content-Type': 'application/json',
    }
  },
  );
  return gemRes;
};



// Collection calls 

interface IGetGemCollection {
  filters: object,
  limit: number,
  fields: object,
}


// This estabilshed the proper body for fetch request to gemAPI
export const getCollectionReqBody = (
  contractAddress: string,
  limit = 1,
): IGetGemCollection => ({
  filters: {
    address: contractAddress,
  },
  limit,
  fields: {
    name: 1,
    address: 1,
    imageUrl: 1,
    stats: 1,
  },
});

// This function returns the contract information from the GemApi for a certain address(not slug)
export const getGemContract = async (collectionSlug: string): Promise<GemCollectionStats> => {
  // eslint-disable-next-line no-return-await
  const gemRes: { data: GemCollectionStats[] } = await fetch(`${GEM_API_BASE_URL}/collections`, {
    method: 'POST',
    body: JSON.stringify({
      ...getCollectionReqBody(collectionSlug),
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());
  return gemRes?.data[0];
};