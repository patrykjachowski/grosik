import { useEffect } from "react";

export const useOutsideClick = (ref, callback) => {
    const handleClick = e => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    });
};


export const useEnterKeyPressed = (callback) => {
    const handleKeyPress = e => {
            if (e.keyCode === 13) {
                callback()
            }
    }

    useEffect(() => {
        document.addEventListener("keyup", handleKeyPress);

        return () => {
            document.removeEventListener("keyup", handleKeyPress);
        };
    });
}