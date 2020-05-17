import React, { useState, useEffect, useCallback } from 'react';

const useFetch = (cb, executeImmediate) => {
    const [ response, setResponse ] = useState(null);
    const [ pending, setPending ] = useState(false);
    const [ error, setError ] = useState(null);

    const invoke = useCallback(() => {
        setPending(true);
        setResponse(null);
        setError(null);

        return cb()
               .then(response => setResponse(response))
               .catch(error => setError(error))
               .finally(() => setPending(false));
    }, [cb]);

    useEffect(() => {
        invoke();
    }, [ invoke, executeImmediate ]);

    return { invoke, pending, response, error };
}

export default useFetch;