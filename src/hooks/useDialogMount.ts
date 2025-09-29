import {useEffect, useState} from "react";

export const useDialogMount = (isOpen: boolean, delay: number = 450) => {
    const [mounted, setMounted] = useState(isOpen);
    const [rendered, setRendered] = useState(false);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (isOpen) {
            setMounted(true);
            setRendered(false); // opacity=0 을 주기 위해 render false
            // 브라우저가 mount 반영 후에 rendered=true 주입
            timeoutId = setTimeout(() => setRendered(true), 30);
        } else {
            // rendered=false 로 opacity 내려가고 delay 후에 mounted=false
            setRendered(false);
            timeoutId = setTimeout(() => setMounted(false), delay);
        }

        return () => clearTimeout(timeoutId);
    }, [isOpen, delay]);

    return {mounted, rendered};
}

export default useDialogMount