 import NavBar from "../NavBar/NavBar";

 import styles from "./Landing.module.css"

 import {Link} from 'react-router'

const Landing = () => {

// className={styles.}

  return (
    <main  className={styles.container} >
      <NavBar/>
     
      <section className={styles.hero} >
        <h1> Welcome to CareerBoard</h1>
        <span  className={styles.subtitle} >  Your visual job application tracker</span>
        <p className={styles.description} > 
          Wheter you're exploring new opporntuniteies or actively applying, <strong>CareerBoard</strong> helps you organize your job hunt with a clear, colorful board.
        </p>
      </section>

      <section className={styles.features}>
        <h2>What You Can Do</h2>
        <ul >
            <li>🗂 Track your progress across five stages: Prospective, Applied, Interviewing, Offer, and Rejected. </li>
            <li>💼 Add job listings with company names, roles, and salary details.</li>
            <li>📊 Compare offers and monitor salary trends.</li>
            <li>📅 Stay organized with a visual overview of your job search.</li>
        </ul>
      </section>

      <section className={styles.benefits}>
          <h2>Why CareerBoard?</h2>
          <ul >
            <li>✅ Intuitive layout with drag-and-drop functionality</li>
            <li>✅ Real-time updates and cloud sync </li>
            <li>✅ Designed for job seekers at every stage</li>
         </ul>
      </section>

      <section className={styles.cta} >
            <p>Become a user who streamlined their job search </p>
            <button className={styles.ctaBtn}> <Link to='/sign-up'> Create Your Free Account </Link></button>

      </section>

      
    </main>
  );
};

export default Landing;

