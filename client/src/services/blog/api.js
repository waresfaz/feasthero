import { ALL_BLOG_POSTS, FIND_BLOG_POST } from '../../constants/api-constants';
import feastHeroAxios from '../axios/feast-hero-axios';

export async function fetchAllBlogPosts() {
    const response = await feastHeroAxios.get(ALL_BLOG_POSTS)
        .then((response) => response)
        .catch((_) => ({ error: true }));
    if (response.error)
        return response;

    return response.data.response;
}

export async function fetchBlogPost(id) {
    const response = await feastHeroAxios.get(`${FIND_BLOG_POST}/${id}`)
        .then((response) => response)
        .catch((_) => ({ error: true }));
    if (response.error)
        return response;

    return response.data.response;
}