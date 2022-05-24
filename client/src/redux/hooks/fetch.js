import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

const useFetch = (asyncActionCreator, ...args) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            await dispatch(asyncActionCreator(...args));
            setLoading(false);
        }
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return loading;
}

export default useFetch;