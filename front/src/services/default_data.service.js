import http from '../http-common'

function getDefaultData() {
    return http.get('/defaultdata').then(response => {
        return response.data;
    })
}

export default { getDefaultData: getDefaultData }