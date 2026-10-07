import {
  useState,
  useEffect
} from 'react';

const MOBILE_BREAKPOINT = 768;

function useIsMobile () {
  const getIsMobile = () => typeof window !== 'undefined' && window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches;

  const [isMobile,
    setIsMobile] = useState(getIsMobile;

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const onChange = e => setIsMobile(e.matches);

    mql.addEventListener("change", onChange);

    setIsMobile(mql.matches);

    return () => mql.removeEventListener("change", onChange);

  }, []);

  return !!isMobile;
}

export default useIsMobile;