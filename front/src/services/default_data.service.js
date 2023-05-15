import http from '../http-common'

function getDefaultData() {
    return http.get('default/defaultdata').then(response => {
        return response.data;
    })
}

function getTrainingProgram(id) {
    return http.get('/default/get_training_program', { params: { id: id } })
        .then(response => {
            return response.data;
        }).catch(err => {
            return err;
        })
}

function getHealthRecord(id) {
    return http.get('/default/get_health_record', { params: { id: id } })
        .then(response => {
            return response.data;
        }).catch(err => {
            return err;
        })
}

export default {
    getDefaultData: getDefaultData,
    getTrainingProgram: getTrainingProgram,
    getHealthRecord: getHealthRecord
}