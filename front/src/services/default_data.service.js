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

function getHealthIndicator(id) {
    return http.get('/default/get_health_indicators', { params: { id: id } })
        .then(response => {
            return response.data;
        }).catch(err => {
            return err;
        })
}

function createRecord(form){
    var recordData = {
        value: form.value,
        indicator_id: form.indicator.id,
        date: form.date,
        user_id: form.user.id,
    }
    return http.post('createrecord', recordData).then(response => {
        if (response.status == 200) {
            if (response.data.accessToken) {
                localStorage.setItem('recordData', JSON.stringify(response.data))
            }
        }
        return response.data;
    })
}

export default {
    getDefaultData: getDefaultData,
    getTrainingProgram: getTrainingProgram,
    getHealthRecord: getHealthRecord,
    getHealthIndicator: getHealthIndicator,
    createRecord: createRecord
}