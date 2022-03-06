import React from "react";
import Nav from '../components/Nav'
import styles from '../styles/About.module.css'

export default function About() {
  return (
    <main>
      <Nav />
      <div className={styles.main}>
        <h1 className={styles.head}>Why we started? 🚀</h1>
        <section class="content">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam
          labore ab ad atque? Quia officia esse sunt dolores! Sit laboriosam
          quasi, ut, rerum id doloremque pariatur modi animi, mollitia nam
          dignissimos? Deserunt provident incidunt dolore magnam, doloremque
          enim ut velit cupiditate voluptatum rem, eos mollitia natus sapiente
          expedita beatae. Laboriosam, omnis incidunt! Hic voluptate, ut,
          repellat consectetur quo harum eveniet et provident sint at id error?
          Iure, sapiente. Incidunt nihil, enim ipsum sit, excepturi voluptatem
          iure autem sed, iusto dolores velit minima dignissimos harum dolorem.
          Mollitia, quis praesentium? Ut dolores architecto numquam fuga vel
          veniam harum doloremque, dicta animi perspiciatis.
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
      </div>
    </main>
  );
}
