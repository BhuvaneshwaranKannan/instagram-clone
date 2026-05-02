import { useState, useEffect } from "react";

const useFetch = (url) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const controller = new AbortController();

        const fetchData = async () => {
            try {
                const res = await fetch(url, {
                    signal: controller.signal
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }

                const json = await res.json();
                setData(json);
                setLoading(false);

            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message);
                    setLoading(false);
                }
            }
        };

        fetchData();

        // ✅ cleanup (prevents memory leak)
        return () => controller.abort();

    }, [url]); // ✅ FIX

    return [data, loading, error];
}

export default useFetch;