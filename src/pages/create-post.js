import React from "react";
import Form from "../components/Form";
import { useEffect, useState } from "react";

export default function CreatePost() {


  const [tribeID, setTribeId] = useState();

  useEffect(() => {
    const urlParams = window.location.href;
    const tribeID = urlParams.split("=")[1];
    setTribeId(tribeID);

  }, [])


  return <Form tribeID={tribeID} />;
}
