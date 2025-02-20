import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../FormStyling.module.css";
import { getMyUserDetails } from "../../services/users.js";
import { createBlog } from "../../services/blogs.js";
import { useEffect } from "react";

export function NewBlogForm() {
    const [errorStatus, setErrorStatus] = useState(false);
    const [country, setCountry] = useState("");
    const [sections, setSections] = useState([
        { heading: "", content: "" }
    ]);
    const [generalError, setGeneralError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        getMyUserDetails(token)
            .then((allData) => {
                localStorage.setItem('token', allData.token);
                return allData.userData;
            })
            .then((data) => {
                setCountry(data.country || "");
            })
            .catch((error) => {
                console.error("Error fetching user details:", error);
            });
    }, []);

    const handleAddSection = () => {
        setSections([...sections, { heading: "", content: "" }])
    };

    const handleRemoveSection = (index) => {
        const newSections = sections.filter((_, i) => i !== index);
        setSections(newSections)
    };

    const handleSectionChange = (index, field, value) => {
        const newSections = sections.map((section, i) => {
            if (i === index) {
                return { ...section, [field]: value };
            }
            return section
        });
        setSections(newSections);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorStatus(false);
        setGeneralError("");

        const token = localStorage.getItem('token');

        try {
            const data = await createBlog(token, country, sections);
            setSuccessMessage("Blog added successfully!");

            console.log("Blog post successful:", data);

            setSuccessMessage("Blog added successfully!");
            setTimeout(() => navigate("/dashboard"), 1000);

        } catch (error) {
            console.error("Error creating blog:", error);
            setGeneralError(error.message || "Blog creation failed. Please try again.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                {successMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded" role="alert">
                        {successMessage}
                    </div>
                )}

                {generalError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
                        {generalError}
                    </div>
                )}

                <div className="space-y-4">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Country
                    </label>
                    <input
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Country"
                        id="country"
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </div>

                {sections.map((section, index) => (
                    <div key={index} className="space-y-4 p-4 border rounded-lg bg-gray-50">
                        <div className="flex justify-between items-center">
                            <h5 className="text-lg font-medium">Section {index + 1}</h5>
                            {sections.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemoveSection(index)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    Remove Section
                                </button>
                            )}
                        </div>

                        <div className="space-y-4">
                            <input
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Section Heading"
                                type="text"
                                value={section.heading}
                                onChange={(e) => handleSectionChange(index, "heading", e.target.value)}
                                required
                            />

                            <textarea
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Section Content"
                                rows="4"
                                value={section.content}
                                onChange={(e) => handleSectionChange(index, "content", e.target.value)}
                                required
                            />
                        </div>
                    </div>
                ))}

                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={handleAddSection}
                        className="flex items-center mt-2 mx-1 px-3 py-2 rounded-pill border-0 bg-green"
                    >
                        Add Another Section
                    </button>

                    <button
                        type="submit"
                        className="flex items-center mt-2 mx-1 px-3 py-2 rounded-pill border-0 bg-green"
                    >
                        Create Blog
                    </button>
                </div>
            </form>
        </div>
    );
};
