const { NFTStorage, File, Blob } = require("nft.storage");

// Upload via nft.storage clinet

const NFT_STORAGE_TOKEN = process.env.NEXT_PUBLIC_NFT_DOT_STORAGE_API_KEY;
const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

const nftDotStorage = async (img, name, description) => {
  console.log("CALLED  NFT DOT STORAGE");
  try {
    var metadata;
    if (img !== "") {
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
      metadata = await client.store({
        name: name,
        description: description,
        image: img,
      });
    } else {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      metadata = await client.store({
        name: name,
        description: description,
      });
    }
    return metadata;
  } catch (error) {
    console.log("NFT.PORT UPLOAD ERROR", error);
    return "ERROR_NFT_DOT_STORAGE";
  }
};

module.exports = {
  nftDotStorage,
};
