// src/components/Dashboard/Dashboard.jsx

import { useContext } from 'react';

import { UserContext } from '../../contexts/UserContext';

import styles from './DashBoard.module.css'

const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <main className={styles.container}  >
      <h1>Welcome, {user.username}</h1>
      
    </main>
  );
};

export default Dashboard;

