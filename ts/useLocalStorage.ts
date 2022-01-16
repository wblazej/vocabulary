import { Dispatch, SetStateAction, useEffect, useState } from "react";

const useLocalStorage = (key: string, value: string): [string | null, Dispatch<SetStateAction<string | null>>] => {
    const [ result, setResult ] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined" && result) {
            localStorage.setItem(key, result);
        }
    }, [result]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setResult(localStorage.getItem(key) || value);
        }
    }, []);

    return [ result, setResult ];
};

export default useLocalStorage;