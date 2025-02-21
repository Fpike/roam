import styles from "./LatestBlogs.module.css";
import "../../index.css";

import { useNavigate } from "react-router-dom";

export function DisplayLatestBlogs() {
    return (
        <>
            <div className="container p-0">
                <div className={`container ${styles.latestBlogsContainer}`}>
            
                    <div className={`d-flex align-items-center justify-content-between ${styles.headerRow}`}>
                        <h4 className="m-0">Latest Blogs</h4>
                        <div className={`${styles.addBlogButton}`}>Add Blog +</div>
                    </div>

                    <div className="container my-3">
                        <p>When you add a new blog, it will be shown here.</p>
                        <div className="mt-2">
                            <div className={`${styles.addBlogButton}`}>Add Blog +</div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}