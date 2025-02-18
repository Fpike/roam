import styles from "./LatestBlogs.module.css";
import "../../index.css"

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function LatestBlogs() {
    return (
        <>
        <div className="container p-0">
            <div className={`container ${styles.latestBlogsContainer}`}>
                <div className={`align-items-center ${styles.LatestBlogs}`}>
                    <h4>Latest Blogs</h4>
                </div>
            </div>
        </div>
        </>
    )
}