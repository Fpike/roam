import { Link } from "react-router-dom";
import { NavBar } from "../../components/NavBar";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import photo from "../../assets/taghazout.jpeg"
import styles from "./Homepage.module.css"
import "../../index.css"


export function Homepage() {

    return (
        <>
            <NavBar />
            <div className="row m-0 p-0">
                <div className="col-md-6 p-0">
                    <img src={photo} />
                </div>
                <div className="col-md-6 p-0 d-flex justify-content-center align-items-center">
                    <div className={styles.containerBox}>
                        <h3>Welcome, Explorer!</h3>
                        <p>Save your favorite travel destinations and share your journey with a community of like-minded travelers.</p>
                        <h5>Already a member?</h5>
                        <LoginForm />
                        <Link style={{marginBottom: "40px"}} className={styles.Link} to="/signup" >Not a member? Sign up here</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
