import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import Nav from "../components/Nav";
import { useTribes } from "@decentology/hyperverse-ethereum-tribes";
import { useEthereum } from "@decentology/hyperverse-ethereum";
import { toast } from "react-toastify";
import { useHyperverse } from "@decentology/hyperverse";

const Home: NextPage = () => {
  const router = useRouter();
  const { blockchain } = useHyperverse();
  const { address } = useEthereum();
  const { TribeId } = useTribes();
  const { data, error } = TribeId();
  console.log("Blockchian:", blockchain);
  useEffect(() => {
    if (error) {
      if (error instanceof Error) {
        toast.error(error.message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    }
  }, [error]);
  return (
    <>
      <Head>
        <title>Web3 Tribes </title>
        <meta name="description" content="Tribes to connect people together" />
      </Head>

      <main>
        <Nav />
        <div className={styles.hero}>
          <div className={styles.header}>
            <h2> Web3-Tribes</h2>
            <h6 className={styles.about}>
              Web3-Tribes allows you to join communities and find people with
              common goals and interests 🔥️
            </h6>
            {address ? (
              !data ? (
                <button
                  className={styles.join}
                  onClick={() => {
                    router.push("/all-tribes");
                  }}
                >
                  Join A Tribe
                </button>
              ) : (
                <button
                  className={styles.join}
                  onClick={() => router.push("/my-tribe")}
                >
                  View Your Tribe
                </button>
              )
            ) : null}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
