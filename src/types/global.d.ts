interface GemAssetResults {
  data: {
    assets: Array<GemAsset>;
  };
}


interface SingleGemAssetResults {
  data: GemAsset;
}

interface GemAsset {
    id: string,
    name: string,
    address: string,
    // description: string,
    collectionName: string,
    // collectionSymbol: string,
    // externalLink: string,
    imageUrl: string,
    // smallImageUrl: string,
    // animationUrl: string,
    // tokenMetadata: string,
    standard: string,
    // decimals: number,
    // traits: Array<String>,
    // creator: object,
    // owner: object,
    // market: string,
    // orderCreator: string,
    openseaOrderCreatedAt: string,
    // currentBasePrice: number,
    // currentEthPrice: number,
    // currentUsdPrice: number,
    // ethReserves: string,
    // tokenReserves: string,
    startingPrice: number,
    endingPrice: number,
    duration: number,
    // paymentToken: object,
    // quantity: number,
    // topBid: number,
    // sellOrders: object,
    // lastSale: object,
    // marketUrl: string,
}

interface GemCollectionStats {
  name: string,
    symbol: string,
    standard: string,
    description: string,
    address: string,
    createdDate: string,
    externalUrl: string,
    imageUrl: string,
    totalSupply: number,
    isVerified: boolean,
    sevenDayVolume: number,
    oneDayVolume: number,
    lastOpenSeaSaleCreatedId: number,
    lastOpenSeaTransferId: number,
    lastOpenSeaCancelledId: number,
    lastRaribleAssetUpdateId: string,
    lastNumberOfUpdates: number,
    chainId: string,
    stats: object,
    traits: Array<String>,
    indexingStatus: string,
    indexingError: object,
    discordUrl: string,
    mediumUsername: string,
    telegramUrl: string,
    twitterUsername: string,
    instagramUsername: string,
    wikiUrl: string,
}

interface GemNFTData {
  imageUrl: string | null;
  tokenId: number;
  contractAddress: string,
  _id: number;
}
