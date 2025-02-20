import styles from "./LatestBlogs.module.css";
import "../../index.css"

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function DisplayLatestBlogs() {
    return (
        <>
            <div className="container p-0">
                <div className={`container ${styles.latestBlogsContainer}`}>
                    
                    <div className={`row d-flex align-items-center ${styles.countryRow}`}>
                        <div className="col-md-9">
                            <h4>Latest Blogs</h4>
                        </div>
                        <div className="col-md-3">
                            <div className={`${styles.addBlogButton}`}>Add Blog +</div>
                        </div>
                        <div className="container my-3">
                            <div className="row p-0 m-0">
                                <p>When you add a new blog, it will be shown here.</p>
                            </div>
                            <div className="row p-0 m-0">
                            <div className={`${styles.addBlogButton}`}>Add Blog +</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}