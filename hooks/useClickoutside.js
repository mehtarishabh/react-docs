import { useEffect, useRef } from 'react';
/**
 * useClickOutside is a custom hook that detects clicks outside of a specified element.
 * @param {Object} ref - The ref of the element to detect clicks outside of.
 * @param {Function} handler - The function to call when a click outside is detected.
 * @param {string} eventType - The type of event to listen for (default: 'mousedown').
 * @param {Object} eventListenerOptions - Options for the event listener (default: {}).
 */
export default function useClickOutside(
    ref,
    handler,
    eventType = 'mousedown',
    eventListenerOptions = {}
) {
    const latestHandler = useRef(handler);
    latestHandler.current = handler;

    useEffect(() => {
        const listener = (event) => {
            const target = event.target;
            if (!target || !target.isConnected) {
                return;
            }

            const outside = ref.current && !ref.current.contains(target);
            if (!outside) {
                return;
            }

            latestHandler.current(event);
        };

        window.addEventListener(eventType, listener, eventListenerOptions);

        return () => {
            window.removeEventListener(eventType, listener, eventListenerOptions);
        };
    }, [ref, eventType, eventListenerOptions]);
}