import { NavBar } from "../../components/NavBar.jsx";
import { SignUpForm } from "../../components/SignUpForm/SignUpForm";
import styles from "./SignUpPage.module.css"


export function SignUpPage() {

    return (
        <>
            <NavBar />
                  <div className={styles.container}>
                    <div className={styles.containerBox}>
                      <h3>Sign up</h3>
                      <SignUpForm />
                    </div>
                  </div>
        </>
    );
};
