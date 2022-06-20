import { useDispatch } from 'react-redux';
import { useState } from 'react';

const useMutate = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [data, setData] = useState(null);
    const dispatch = useDispatch();

    const callable = async (asyncActionCreator, ...args) => {
        setLoading(true);
        try {
            const res = await dispatch(asyncActionCreator(...args));
            setData(res);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    }

    return [callable, loading, error, data];
}

export default useMutate;