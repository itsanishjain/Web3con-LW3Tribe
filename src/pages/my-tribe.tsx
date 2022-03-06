import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useEffect } from "react";
import { useEthereum } from "@decentology/hyperverse-ethereum";
import { useTribes } from "@decentology/hyperverse-ethereum-tribes";
import styles from "../styles/Home.module.css";
import Nav from "../components/Nav";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import Image from "next/image";
import { useStorage } from "@decentology/hyperverse-storage-skynet";
import Form from "../components/Form";
import PostCard from "../components/PostCard";
import Link from "next/link";

const TribesPage = () => {
  const router = useRouter();
  const { address: account } = useEthereum();
  const { Tribe, Leave } = useTribes();
  const { clientUrl } = useStorage();
  const { data, isLoading: tribeDataLoading, error: tribeErr } = Tribe();
  const {
    mutate,
    isLoading: leaveTribeLoading,
    error: leaveErr,
  } = Leave({
    onSuccess: () => router.push("/"),
  });

  const isLoading = tribeDataLoading || leaveTribeLoading;

  const error = tribeErr || leaveErr;
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
    <main>
      <Nav>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            marginLeft: "25px"
            // paddingBottom: "100px",
          }}
        >
          <button className={styles.join} onClick={() => mutate()}>
            Leave Tribe
          </button>
        </div>
      </Nav>
      {isLoading ? (
        <Loader loaderMessage="Processing..." />
      ) : account && !tribeErr && data ? (
        <>
          <div className={styles.container2} style={{ height: "500px" }}>
            <div className={styles.container3}>
              {data.image === "N/A" ? (
                <div className={styles.tribeCard}>
                  <h2>{data.name}</h2>
                </div>
              ) : (
                <Image
                  width={300}
                  height={400}
                  src={`${clientUrl}/${data.image}/`}
                  alt={data.name}
                  className={styles.tribe}
                />
              )}

              <div className={styles.text}>
                <h1>{data.name}</h1>
                <p className={styles.description}>{data.description}</p>
                <Link href="/create-post">
                  <a
                    style={{
                      width: "35%",
                      border: "1px solid white",
                      borderRadius: "5px",
                      padding: "10px",
                      display: "flex",
                      justifyContent: "center",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      marginTop: "1.2rem",
                      fontFamily: "Press Start 2P",
                      textDecoration: "none",
                    }}
                  >
                    Create Post
                  </a>
                </Link>
              </div>

              {/* <Link href="/create-post">
                <a
                  style={{
                    width: "20%",
                    border: "1px solid white",
                    borderRadius: "5px",
                    padding: "10px",
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    marginBottom: "1rem",
                    fontFamily: "Press Start 2P",
                    textDecoration: "none",
                  }}
                >
                  Create Post
                </a>
              </Link> */}

              {/* <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingBottom: "100px",
                }}
              >
                <button className={styles.join} onClick={() => mutate()}>
                  Leave Tribe
                </button>
              </div> */}
            </div>
          </div>

          {/* <Link href="/create-post">
            <a
              style={{
                width : "10%",
                border: "1px solid white",
                borderRadius: "5px",
                padding: "10px",
                display: "flex",
                justifyContent: "center",
                fontSize: "2rem",
                fontWeight: "bold",
                marginBottom: "1rem",
                fontFamily: "Press Start 2P",
                textDecoration: "none",
                
              }}
            >
              Create Post
            </a>
          </Link> */}

          <PostCard />

          {/* <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              paddingBottom: "100px",
            }}
          >
            <button className={styles.join} onClick={() => mutate()}>
              Leave Tribe
            </button>
          </div> */}
        </>
      ) : (
        account &&
        !tribeErr && (
          <div className={styles.container2}>
            <button
              className={styles.join}
              onClick={() => router.push("/all-tribes")}
            >
              Join a Tribe
            </button>
          </div>
        )
      )}

      {!account && (
        <div className={styles.container2}>
          <p className={styles.error}>Connect Wallet to view your tribe</p>
        </div>
      )}
    </main>
  );
};

export default TribesPage;
