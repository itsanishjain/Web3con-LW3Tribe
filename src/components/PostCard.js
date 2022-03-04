import React from "react";
import { Contract, providers } from "ethers";
import { DC_CONTRACT_ADDRESS, DC_CONTRACT_ABI } from "../constants";
import { useState, useEffect } from "react";

export default function PostCard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const fetchAllPosts = async () => {
    const provider = new providers.Web3Provider(window.ethereum);
    const DCContract = new Contract(
      DC_CONTRACT_ADDRESS,
      DC_CONTRACT_ABI,
      provider
    );
    const posts = await DCContract.allPosts();
    console.log(posts);
    setPosts(posts);
  };

  const boxStyle = {
    border: "1px solid white",
    borderRadius: "5px",
    padding: "1rem",
    marginTop: "5rem",
    backgroundColor: "rgba(0,0,0,0.5)",
  };

  return <div style={boxStyle}>PostCard</div>;
}
