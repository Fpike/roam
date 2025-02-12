import styles from "./LatestBlogs.module.css";
import "../../index.css"


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function LatestBlogs() {
    return (
        <>
        <div className="container">
            <div className={styles.container}>
                <div className="align-items-center">
                    <h3>Latest Blogs</h3>
                </div>
            </div>
        </div>
        </>
    )
}