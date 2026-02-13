import { useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";

import styles from './NavBar.module.css';

import Logo from '../../assets/logo.png';
//<img src={Logo} alt='The logo' />

{/* <div>
                        <h2>CB</h2>
                        <h3>CareerBoards</h3>
                    </div> */}


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
                    <Link to='/'> 
                    <div className={styles.logo}>
                        <h2>CB</h2>
                        <h3>CAREERBOARDS</h3>
                    </div>  
                    </Link>
                <ul>
                    <li><Link to='/jobs'>Job Cards</Link></li>
                    <li><Link to='/jobs/new'>New Job Card</Link></li>
                    <li><Link to='/' onClick={handleSignOut}>Sign Out</Link></li>
                    
                </ul>  
                </>
            ) : (
               <>
                <Link to='/'>
                <div className={styles.logo}>
                        < div className={styles.logoIcon} >
                        <span>CB</span>
                        </div>
                        <h3>CAREERBOARDS</h3>
                    </div> 
                </Link>
                <ul>
                    
                     <li><Link to='/sign-in'>Sign In</Link></li>
                    
                </ul>
                </>
            )}
            
        </nav>
    );
};

export default NavBar;