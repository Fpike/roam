import { NavBar } from "../../components/NavBar";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import styles from "./LoginPage.module.css"

export function LoginPage() {

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.containerBox}>
          <h3>Log in</h3>
          <LoginForm />
        </div>
      </div>
    </>
  );
}
