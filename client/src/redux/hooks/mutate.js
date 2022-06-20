import { useDispatch } from 'react-redux';
import { useState } from 'react';

const useMutate = ({ withDispatch }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [data, setData] = useState(null);
    const dispatch = useDispatch();

    const callable = async (asyncCallback, ...args) => {
        setLoading(true);
        try {
            if (withDispatch)
                setData(await dispatch(asyncCallback(...args)));
            else
                setData(await asyncCallback(...args));
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    }

    return [callable, loading, error, data];
}

export default useMutate;