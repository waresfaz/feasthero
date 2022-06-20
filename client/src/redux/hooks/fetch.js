import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

const useFetch = (asyncActionCreator, ...args) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [data, setData] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                setData(await dispatch(asyncActionCreator(...args)));
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        }
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [loading, error, data];
}

export default useFetch;