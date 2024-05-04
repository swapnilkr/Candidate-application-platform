// api function to get list of jobs

const fetchJobs = async (limit, offset) => {
    try {
        const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                limit,
                offset
            })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch job listings");
    }
};

export default fetchJobs;
