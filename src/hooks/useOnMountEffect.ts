import { useEffect, useRef } from 'react';

const useOnMountEffect = (effect: () => Promise<any> | any) => {
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      effect();
    }
  }, []);
};

export default useOnMountEffect;
