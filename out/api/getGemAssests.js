"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGemContract = exports.getCollectionReqBody = exports.getSingleGemAsset = exports.getGemAsset = exports.getGemAssets = exports.getAssetsReqBody = void 0;
const axios_1 = __importDefault(require("axios"));
const fetch = require("node-fetch");
const getAssetsReqBody = (contractAddress, offset = 0, limit = 100, tokenId, buyNow = false) => ({
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
exports.getAssetsReqBody = getAssetsReqBody;
const GEM_API_BASE_URL = 'https://gem-public-api.herokuapp.com';
const getGemAssets = async (items) => {
    return Promise.all(items.map(nft => getSingleGemAsset({ contractAddress: nft.contractAddress, tokenId: nft.tokenId })));
};
exports.getGemAssets = getGemAssets;
const getGemAsset = async (contractAddress, tokenId) => {
    const gemRes = await fetch(`${GEM_API_BASE_URL}/assets`, {
        method: 'POST',
        body: JSON.stringify({
            ...(0, exports.getAssetsReqBody)(contractAddress, 0, 1, tokenId),
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return gemRes.data[0];
};
exports.getGemAsset = getGemAsset;
function getSingleGemAsset({ contractAddress, tokenId }) {
    const gemRes = axios_1.default.post(`${GEM_API_BASE_URL}/assets`, {
        body: JSON.stringify({
            ...(0, exports.getAssetsReqBody)(contractAddress, 0, 1, tokenId),
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return gemRes;
}
exports.getSingleGemAsset = getSingleGemAsset;
;
const getCollectionReqBody = (contractAddress, limit = 1) => ({
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
exports.getCollectionReqBody = getCollectionReqBody;
const getGemContract = async (collectionSlug) => {
    const gemRes = await fetch(`${GEM_API_BASE_URL}/collections`, {
        method: 'POST',
        body: JSON.stringify({
            ...(0, exports.getCollectionReqBody)(collectionSlug),
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json());
    return gemRes?.data[0];
};
exports.getGemContract = getGemContract;
//# sourceMappingURL=getGemAssests.js.map