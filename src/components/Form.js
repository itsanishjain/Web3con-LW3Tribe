import { useState, useEffect } from "react";
import styles from "../styles/Form.module.css";
import { nftDotStorage } from "../utils";
import { Contract, providers } from "ethers";
import { useEthereum } from "@decentology/hyperverse-ethereum";
import { DC_CONTRACT_ADDRESS, DC_CONTRACT_ABI } from "../constants";

export default function Form() {
  console.log(DC_CONTRACT_ADDRESS);
  const { address } = useEthereum();

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const [loading, setLoading] = useState(false);

  // const [posts, setPosts] = useState([]);

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

  // useEffect(() => {
  //   fetchAllPosts();
  // }, []);

  // const fetchAllPosts = async () => {
  //   const provider = new providers.Web3Provider(window.ethereum);
  //   const DCContract = new Contract(
  //     DC_CONTRACT_ADDRESS,
  //     DC_CONTRACT_ABI,
  //     provider
  //   );
  //   const posts = await DCContract.allPosts();
  //   console.log(posts);
  //   setPosts(posts);
  // };

  const addPost = async (metadata, tribeID) => {
    console.log("POST");
    const provider = new providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(address);
    const DCContract = new Contract(
      DC_CONTRACT_ADDRESS,
      DC_CONTRACT_ABI,
      signer
    );
    // setLoading(true);
    const tx = await DCContract.addPost(metadata, tribeID);
    await tx.wait();
    // setLoading(false);
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
    console.log("HERE");

    // check form values are not empty
    const errors = validateError();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    console.log("formValues", formValues);
    setLoading(true);
    const metadata = await nftDotStorage(
      formValues.image,
      formValues.title,
      formValues.description
    );
    console.log("Metadata", metadata.url);
    await addPost(metadata.url, 0);
    console.log("Metadata", metadata.url);

    setLoading(false);
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
