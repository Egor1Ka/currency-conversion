import React from 'react';
import styles from './styles.module.scss';
import logoPromovaText from '../../assets/img/logoPromovaText.png';

export const AboutPage: React.FC = () => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.imgContainer}>
            <img
              src={logoPromovaText}
              alt='Profile'
              className={styles.profilePic}
            />
          </div>

          <section className={styles.content}>
            <h1>Hello, Promova team!</h1>
            <p>
              I want to express my sincere gratitude for your feedback and the
              opportunity to showcase my skills.
            </p>
            <p>
              The test assignment was very interesting, and I didn't encounter
              any major difficulties. I completed the task in full, using Redux
              and Redux Toolkit to demonstrate my knowledge. I also have
              commercial experience with these libraries. As I did the
              assignment after my main job, I didn't have time to cover the
              application with tests. If I had more time, I would have
              refactored all user interfaces into separate components.
            </p>
            <p>Thank you for your time, looking forward to your feedback!</p>
          </section>
        </div>
      </div>
    </div>
  );
};
