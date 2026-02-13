import { useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";

import styles from './NavBar.module.css';

import Logo from '../../assets/logo.svg';



const NavBar = () => {
    const { user, setUser } = useContext(UserContext);

    const handleSignOut = () =>{
        localStorage.removeItem('token');
        setUser(null);
    };


    return (

        <nav className={styles.container}> 
     {user ? (
                <>
                    <Link to='/'> <img src={Logo} alt='An atom' /> </Link>
                <ul>
                    <li><Link to='/jobs'>Job Cards</Link></li>
                    <li><Link to='/jobs/new'>New Job Card</Link></li>
                    <li><Link to='/' onClick={handleSignOut}>Sign Out</Link></li>
                    
                </ul>  
                </>
            ) : (
               <>
                <Link to='/'><img src={Logo} alt='An atom' /></Link>
                <ul>
                    
                     <li><Link to='/sign-in'>Sign In</Link></li>
                    
                </ul>
                </>
            )}
            
        </nav>
    );
};

export default NavBar;