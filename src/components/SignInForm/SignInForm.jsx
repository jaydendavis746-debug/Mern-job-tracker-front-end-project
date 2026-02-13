// src/components/SignInForm/SignInForm.jsx

import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router';

import { signIn } from '../../services/authService';

import { UserContext } from '../../contexts/UserContext';

import styles from './SignInForm.module.css' 
import Logo from '../../assets/logo.png';

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      // This function doesn't exist yet, but we'll create it soon.
      // It will cause an error right now
      const signedInUser = await signIn(formData);

      setUser(signedInUser);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main className={styles.container} >
      <h1>Sign In</h1>
      <p>{message}</p>
      <form autoComplete='off' onSubmit={handleSubmit}>
          
      <img src={Logo} alt='An atom' />
          
        <div className={styles.seperation} >
          <input
            type='text'
            autoComplete='off'
            id='username'
            value={formData.username}
            name='username'
            onChange={handleChange}
            required
            placeholder='Username'
          />
        </div>
        <div className={styles.seperation} >
          <input
            type='password'
            autoComplete='off'
            id='password'
            value={formData.password}
            name='password'
            onChange={handleChange}
            required
            placeholder='Password'
          />
        </div>

        <div className={styles.btn} >
          <button>Sign In</button>
          <button onClick={() => navigate('/')}>Cancel</button>
        </div>


        <div >
         <p> <Link to='/sign-up'> <strong>Create an account </strong></Link> </p>
        </div>

        <div className={styles.divider}></div>

      <footer>
            <p>© {new Date().getFullYear()} CareerBoard. Built to help you track, organize, and land your next opportunity.</p>    
      </footer>


      </form>

    </main>


  );
};

export default SignInForm;

