export const DC_CONTRACT_ADDRESS = "0x24B1546862b53f6D15fB58aDc00B5f09d6c88375";
export const DC_CONTRACT_ABI = [
  {
    inputs: [],
    name: "POST_ID",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_metadataURL",
        type: "string",
      },
      {
        internalType: "enum DC.Tribe",
        name: "t",
        type: "uint8",
      },
    ],
    name: "addPost",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "allPosts",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "postId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "metadateURL",
            type: "string",
          },
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "enum DC.Tribe",
            name: "tribe",
            type: "uint8",
          },
        ],
        internalType: "struct DC.Post[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "posts",
    outputs: [
      {
        internalType: "uint256",
        name: "postId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "metadateURL",
        type: "string",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "enum DC.Tribe",
        name: "tribe",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
