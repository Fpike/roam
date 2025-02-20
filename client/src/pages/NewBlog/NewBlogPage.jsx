import { NavBar } from "../../components/NavBar.jsx";
import { NewBlogForm } from "../../components/Blogs/NewBlogForm.jsx";
import styles from "./NewBlogPage.module.css"


export function NewBlogPage() {

    return (
        <>
            <NavBar />
                  <div className={styles.container}>
                    <div className={styles.containerBox}>
                      <h3>Create a new blog</h3>
                      <NewBlogForm />
                    </div>
                  </div>
        </>
    );
};
