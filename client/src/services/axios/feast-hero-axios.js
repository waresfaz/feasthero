import axios from 'axios';
import { initSettings, settings } from '../../settings';

initSettings();

const feastHeroAxios = axios.create({
    baseURL: settings.SERVER_ORIGIN,
    headers: {'Authorization': process.env.REACT_APP_FEASTHERO_API_TOKEN
    }
})

export default feastHeroAxios;