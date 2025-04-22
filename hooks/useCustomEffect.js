import { useRef } from 'react';

function useCustomEffect(callback, dependencies) {
    const dependenciesRef = useRef([]);

    const hasChanged = dependencies.length !== dependenciesRef.current.length ||
        dependencies.some((dep, index) => dep !== dependenciesRef.current[index]);

    if (hasChanged) {
        dependenciesRef.current = dependencies;
        callback();
    }
    return dependenciesRef.current;
}

export default useCustomEffect;