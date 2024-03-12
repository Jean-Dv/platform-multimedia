import { useState, useEffect } from "react";

export default function useFetch<T>(url: string, token: string) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then(({ data, ok }: { data: T; ok: boolean }) => {
                setData(data);
                setIsLoading(false);
            });
    }, [url, token]);
    return { data, isLoading };
}