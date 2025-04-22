import { useState, useEffect, useRef } from 'react';

function useCustomMemo(callback, dependencies) {
    const [value, setValue] = useState(() => callback());
    const dependenciesRef = useRef([]);

    useEffect(() => {
        let hasChanged = dependencies.length !== dependenciesRef.current.length;

        for (let i = 0; i < dependencies.length; i++) {
            if (dependencies[i] !== dependenciesRef.current[i]) {
                hasChanged = true;
                break;
            }
        }

        if (hasChanged) {
            dependenciesRef.current = dependencies;
            setValue(callback());
        }
    }, [callback, dependencies]);

    return value;
}

export default useCustomMemo;