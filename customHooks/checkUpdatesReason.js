import React, { useEffect, useRef } from "react";

const checkUpdates = ({ name, props }) => {
    const previousProps = useRef();
    useEffect(() => {
        if(previousProps.current) {
            const allAttrs = Object.keys({ ...previousProps, ...props });
            const changes = {};
            allAttrs.forEach(key => {
                if(previousProps.current[key] !== props[key]) {
                    changes[key] = {
                        from: previousProps.current[key],
                        to: props[key],
                    }
                }
            });

            if(Object.keys(changes).length) {
                console.log('[Updates - Caused - By]', name, changes);
            }
        }
        previousProps.current = props;
    });

    return previousProps.current;
}

export default checkUpdates;