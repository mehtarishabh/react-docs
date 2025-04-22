// This custom hook allows you to debounce a value, meaning it will only update after a specified delay.
// This is useful for optimizing performance in scenarios where you want to limit the number of updates to a state or effect.
// For example, when handling user input in a search field, you might want to wait until the user stops typing for a certain amount of time before making an API call.
//
// Example usage:
// const debouncedSearchTerm = useDebounce(searchTerm, 500);
// In this example, the `debouncedSearchTerm` will only update after 500 milliseconds of inactivity in the `searchTerm` input.
// This can help reduce the number of API calls made while the user is typing, improving performance and user experience.

import { useState, useEffect } from 'react' 

function useDebounce(value, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}
export  default useDebounce;
