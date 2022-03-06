import React from "react";
import { Contract, providers } from "ethers";
import { DC_CONTRACT_ADDRESS, DC_CONTRACT_ABI } from "../constants";
import { useState, useEffect } from "react";

import axios from 'axios'

export default function PostCard() {
  const [posts, setPosts] = useState([]);
  const [postResults, setPostResults] = useState();

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    fetchAllPosts();
  }, []);

  const results = [];

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
    const totalPosts = posts.length;
    setLoading(true);
    for (let i = 4; i < totalPosts; i++) {
      await fetchDataFromIPFS(posts[i].metadateURL);
    }
    console.log("RESULTS>>>>>>>>>", results);
    setPostResults(results);
    setLoading(false);
  };


  const ipfsMetadataUrlToHttpUrl = (ipfsUrl) => {
    const url = ipfsUrl.replace('ipfs://', 'https://');
    const metadataURL = url.replace('/metadata.json', '.ipfs.dweb.link/metadata.json');
    return metadataURL;

  }

  const ipfsImageUrlToHttpUrl = (imageUrl) => {
    var urlArray = imageUrl.split("/");
    urlArray[urlArray.length - 1] = ".ipfs.dweb.link/" + urlArray[urlArray.length - 1];
    var finalUrl = "https:" + "//" + urlArray[2] + urlArray[3];
    return finalUrl;
  }


  const fetchDataFromIPFS = async (_postMetadataURL) => {
    try {
      console.log('_postMetadataURL', _postMetadataURL)
      const metadataURL = ipfsMetadataUrlToHttpUrl(_postMetadataURL);
      const response = await fetch(metadataURL);
      const data = await response.json();
      const imageURl = ipfsImageUrlToHttpUrl(data.image);

      const post = {
        title: data.name,
        description: data.description,
        image: imageURl,
        metadataURL: metadataURL
      }
      results.push(post);
      // setPostResults(results);

      // console.log("Metadata", metadataURL);
      // console.log("IMAGE_URL", imageURl);

    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const boxStyle = {
    border: "1px solid white",
    width: "60%",
    margin: "5rem auto 0 auto",
    borderRadius: "5px",
    padding: "1rem",
    marginTop: "5rem",
    backgroundColor: "rgba(0,0,0,0.5)",
  };

  const postBox = {
    borderBottom: "1px solid white",
    maxWidth:"60%",
    margin: "0 auto",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    padding:"10px"
  }

  return <div style={boxStyle}>
    PostCard
    {
      !loading ? postResults && postResults.map((post, index) => {
        return <div style={postBox} key={index}>
          <h1>{post.title}</h1>
          <img style={{ width: "50%", height: "100%" }} src={post.image} alt="" />
          <p>{post.description}</p>
        </div>
      }) : <div className="loader-center">
        <div className="loader"></div>
      </div>
    }

  </div>;
}
