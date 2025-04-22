// This custom hook allows you to observe multiple elements on the screen and determine if they are visible or not.
// It uses the Intersection Observer API to efficiently monitor the visibility of elements in the viewport.
//
// Example usage:
// const [containerRef, isVisibleIndex] = useElementOnScreen({ threshold: 0.5 });
import { useEffect, useRef, useState } from "react";

const useElementOnScreen = (options) => {
  const containerRef = useRef([]);
  const [isVisibleIndex, setIsVisibleIndex] = useState(false);

  const callbackFunction = (entries) => {
    entries.forEach(function (entry) {
      if(entry.isIntersecting) {
        setIsVisibleIndex(entry.target.classList.value);
      }
    });
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);

    containerRef.current.length > 0 && containerRef.current.forEach((current) => {
      if(current) observer.observe(current);
    })

    return () => {
      containerRef.current.length > 0 && containerRef.current.forEach((current) => {
        if(current) observer.unobserve(current);
      })
    }
  },[containerRef.current, options])

  return [containerRef, isVisibleIndex];
}

export default useElementOnScreen;
