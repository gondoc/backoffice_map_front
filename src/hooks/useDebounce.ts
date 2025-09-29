import {useEffect, useState} from "react";

const useDebounce = <T>(value: T, delay: number) => {

    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay)

        return (() => {
            clearTimeout(timer)
        })

    }, [value]) // delay 는 고정값이라 제외함.

    return debouncedValue;
}

export default useDebounce;
