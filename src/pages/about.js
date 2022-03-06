import React from "react";
import Nav from '../components/Nav'
import styles from '../styles/About.module.css'

export default function About() {
  return (
    <main>
      <Nav />
      <div className={styles.main}>
        <h1 className={styles.head}>Why we built this? 🖖</h1>
        <section className={styles.content}>
        We built Web3-Tribes with one goal in mind: to bring the web3 communities together and help connect as many web3 enthusiasts and developers as possible.Web3-Tribes also allows users to have control over their content. Since Web3-Tribes is a decentralized project the users will be the owners of their content and a central authority will not be able to take down their speech, posts etc. Web3-Tribes also helps in connecting members from different organizations and DAOs to connect and share their thoughts and experiences on different topics.
        </section>
      </div>
      <div className={styles.team}>
        <h1 className={styles.head2}>Meet the Team 👋</h1>
        <div className={styles.imgcontainer}>
          <div className={styles.member}>
            <img src="abbas2.jpg" alt="" />
            <span>Content Writer 📝</span>
            <div className={styles.links}>
                <a href="twitter.com" id="twitter">
                    Twitter
                </a>,
                <a href="github.com" id="github">
                  Github
                </a>
            </div>
          </div>
          <div className={styles.member}>
            <img src="Anish.png" alt="" />
            <span>Head Developer 👑</span>
            <div className={styles.links}>
                <a href="twitter.com" id="twitter">
                    Twitter
                </a>,
                <a href="github.com" id="github">
                  Github
                </a>
            </div>
          </div>
          <div className={styles.member}>
            <img src="Aayush.jpg" alt="" />
            <span>Smart Contract Developer 🧠</span>
            <div className={styles.links}>
                <a href="twitter.com" id="twitter">
                    Twitter
                </a>,
                <a href="github.com" id="github">
                  Github
                </a>
            </div>
          </div>
          <div className={styles.member}>
            <img src="Vatsal.jpg" alt="" />
            <span>Frontend 🎨</span>
            <div className={styles.links}>
                <a href="twitter.com" id="twitter">
                    Twitter
                </a>,
                <a href="github.com" id="github">
                  Github
                </a>
            </div>
          </div>
          <div className={styles.member}>
            <img src="yash4.jpg" alt="" />
            <span>Frontend 🎨</span>
            <div className={styles.links}>
                <a href="twitter.com" id="twitter">
                    Twitter
                </a>,
                <a href="github.com" id="github">
                  Github
                </a>
            </div>
          </div>
        </div>
      <span className={styles.wagmi}>#WAGMI 🚀</span>
      </div>
    </main>
  );
}
