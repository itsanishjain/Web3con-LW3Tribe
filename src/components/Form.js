import { useState, useEffect } from "react";
import styles from "../styles/Form.module.css";
import { nftDotStorage } from "../utils";
import { Contract, providers } from "ethers";
import { useEthereum } from "@decentology/hyperverse-ethereum";
import { DC_CONTRACT_ADDRESS, DC_CONTRACT_ABI } from "../constants";
import { toast } from "react-toastify";

import { useRouter } from "next/router";

export default function Form({ tribeID }) {
  const { address } = useEthereum();
  const router = useRouter();



  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const postTitle = {
    textAlign: "center",
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    fontFamily: "Press Start 2P",
  };

  const formErrorStyle = {
    color: "red",
    fontSize: "1.2rem",
    paddingBottom: "0.5rem",
  };


  const addPost = async (metadata, tribeID) => {
    console.log("POST");
    const provider = new providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(address);
    const DCContract = new Contract(
      DC_CONTRACT_ADDRESS,
      DC_CONTRACT_ABI,
      signer
    );

    const tx = await DCContract.addPost(metadata, tribeID);
    await tx.wait();

  };

  // create a function which set the values of form field
  const handleOnChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  // handle the image
  const handleFileInput = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.files[0] });
  };

  const validateError = () => {
    const errors = {};
    if (formValues.title === "") {
      errors.title = "Title is required";
    }
    if (formValues.description === "") {
      errors.description = "Description is required";
    }
    if (formValues.image === "") {
      errors.image = "Image is required";
    }
    return errors;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Form");

    // check form values are not empty
    const errors = validateError();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setLoading(true);
    const metadata = await nftDotStorage(
      formValues.image,
      formValues.title,
      formValues.description
    );
    await addPost(metadata.url, tribeID - 1);

    setLoading(false);
    toast("Post added successfully");

    router.push("/my-tribe");
  };

  return (
    <>
      <p style={postTitle}>Create Post</p>
      <div className={styles.container}>
        <form className={styles.form}>
          <div className={styles.formGroups}>
            {formErrors.title && (
              <p style={formErrorStyle}>{formErrors.title}</p>
            )}
            <label htmlFor="name">Title</label>
            <input
              type="text"
              value={formValues.title}
              name={Object.keys(formValues)[0]}
              onChange={handleOnChange}
              placeholder="Title"
            />
          </div>

          <div className={styles.formGroups}>
            {formErrors.description && (
              <p style={formErrorStyle}>{formErrors.description}</p>
            )}
            <label htmlFor="description">Description</label>

            <textarea
              className={styles.desc}
              value={formValues.description}
              name={Object.keys(formValues)[1]}
              onChange={handleOnChange}
              placeholder="Enter a description..."
            ></textarea>
          </div>

          <div className={styles.formGroups}>
            {formErrors.image && (
              <p style={formErrorStyle}>{formErrors.image}</p>
            )}
            <input
              type="file"
              name={Object.keys(formValues)[2]}
              onChange={handleFileInput}
            ></input>
          </div>

          {!loading ? (
            <div className={styles.formGroups}>
              <button onClick={handleSubmit} className={styles.submit}>
                Submit
              </button>
            </div>
          ) : (
            <div className="loader-center">
              <div className="loader"></div>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
