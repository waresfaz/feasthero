export default function feastHeroApiTokenWrapper(url) {
    return `${url}?tkn=${process.env.REACT_APP_FEASTHERO_API_TOKEN}`;
}