import http from '../http-common'

function getDefaultData() {
    return http.get('default/defaultdata').then(response => {
        return response.data;
    })
}

export default { getDefaultData: getDefaultData }