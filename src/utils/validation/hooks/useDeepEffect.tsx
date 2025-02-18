import { useEffect, useRef } from 'react';
import isEqual from 'lodash.isequal';

const useDeepEffect: any = (effectFunc:any, deps:any) => {
    const isFirst = useRef(true); // keep track of the status of the effect
    const prevDeps = useRef(deps); // to always have a reference to the previous dependencies
    useEffect(() => {
        // iterate over the current dependencies array and compare each one of them with the previous value.
        const isSame = prevDeps.current.every((obj:any, index:number) => isEqual(obj, deps[index]));
        // to decide if we should run the effect function or not
        if (isFirst.current || !isSame) {
            effectFunc();
        }
        // to update the prevDeps reference with the last dependencies
        isFirst.current = false;
        prevDeps.current = deps;
    }, deps);
};

export default useDeepEffect;
