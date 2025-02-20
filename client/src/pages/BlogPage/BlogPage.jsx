import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBlogByCountry } from "../services/blogs"; // API function to fetch blog

export function BlogPage() {
    const { country } = useParams();
    const [blog, setBlog] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        getBlogByCountry(country)
            .then((data) => setBlog(data))
            .catch((err) => setError("No blog found for this country."));
    }, [country]);

    if (error) return <p>{error}</p>;
    if (!blog) return <p>Loading...</p>;

    return (
        <div>
            <h1>{blog.country} Blog</h1>
            {blog.sections.map((section, index) => (
                <div key={index}>
                    <h2>{section.heading}</h2>
                    <p>{section.content}</p>
                </div>
            ))}
        </div>
    );
}