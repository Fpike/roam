const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function createBlog(token, country, sections) {
    if (!Array.isArray(sections) || sections.length === 0) {
        throw new Error('Sections must be a non-empty array');
    }

    sections.forEach((section, index) => {
        if (!section.heading || !section.content) {
            throw new Error(`Section ${index + 1} is missing required fields`);
        }
    });

    const payload = {
        country: country,
        sections: sections.map(section => ({
            heading: section.heading,
            content: section.content
        }))
    };

    console.log('Sending payload:', payload);
    console.log('Token:', token ? 'Present' : 'Missing');

    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    };

    try {
        const response = await fetch(`${BACKEND_URL}/blogs/create-blog`, requestOptions);
        const data = await response.json();
        
        console.log('Response status:', response.status);
        console.log('Response data:', data);

        if (!response.ok) {
            throw new Error(data.message || `Failed to add blog post: ${response.statusText}`);
        }

        return data;
    } catch (error) {
        console.error('Service error details:', error);
        throw error;
    }
}