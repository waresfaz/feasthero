export default function didCorsFail(error) {
    if (error.response)
        return error.response.status;
    return 500;
}