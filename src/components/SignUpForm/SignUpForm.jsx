import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router";
import { signUp } from "../../services/authService";
import { UserContext } from "../../contexts/UserContext";

import styles from './SignUpForm.module.css'
import Logo from '../../assets/logo.png';

const SignUpForm = () => {
    const navigate = useNavigate();

    const { setUser } = useContext(UserContext);

    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        passwordConf: "",
    });

    const { username, password, passwordConf } = formData;

    const handleChange = (evt) => {
        setMessage("");
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        // console.log(formData);
        try {
            const newUser = await signUp(formData);
            // console.log(newUser);
            setUser(newUser);
            navigate("/");
        } catch (err) {
            setMessage(err.message);
        }
    };

    const isFormInvalid = () => {
        return !(username && password && password === passwordConf);
    };

    return (
        <main className={styles.container} >
        <h1>Sign Up</h1>
        <p>{message}</p>
        <form onSubmit={handleSubmit}>

            <img src={Logo} alt='An atom' />

            <div className={styles.seperation}>
            
            <input
                type="text"
                id="name"
                value={username}
                name="username"
                onChange={handleChange}
                required
                placeholder="Username"
            />
            </div>
            <div className={styles.seperation}>
            <input
                type="password"
                id="password"
                value={password}
                name="password"
                onChange={handleChange}
                required
                placeholder="Password"
            />
            </div>
            <div className={styles.seperation} >
            <input
                type="password"
                id="confirm"
                value={passwordConf}
                name="passwordConf"
                onChange={handleChange}
                required
                placeholder="Confirm Password"
            />
            </div >
            <div className={styles.btn}>
            <button disabled={isFormInvalid()}>Sign Up</button>
            <button onClick={() => navigate("/")}>Cancel</button>
            </div>

            <div>
                <p> <Link to='/sign-in'><strong>Log in</strong></Link> </p>
             </div>

            <div className={styles.divider}></div>

            <footer>
               <p>© {new Date().getFullYear()} CareerBoard. Built to help you track, organize, and land your next opportunity.</p>
            </footer>

        </form>
        </main>

        
    );
};

export default SignUpForm;