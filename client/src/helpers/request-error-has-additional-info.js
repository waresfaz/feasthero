export default function requestErrorHasAdditionalInfo(errorResponse) {
    return (
        errorResponse.status === 400
        || errorResponse.status === 404
        || errorResponse.status === 401
        || errorResponse.status === 409
    )
        && errorResponse.data['errors'];
}