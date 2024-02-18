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

function getHealthRecords() {
    return http.get('/health_records/get_health_records')
        .then(response => {
            return response.data;
        }).catch(err => {
            return err;
        })
}

function getHealthIndicator(id) {
    return http.get('/default/get_health_indicator', { params: { id: id } })
        .then(response => {
            return response.data;
        }).catch(err => {
            return err;
        })
}

function getRecordsByIndicator(indicator_id) {
    return http.get('/health_records/get_records_by_indicator', { params: { indicator_id: indicator_id } })
        .then(response => {
            return response.data;
        }).catch(err => {
            return err;
        })
}


function getHealthIndicators() {
    return http.get('/default/get_health_indicators')
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
    return http.post('/createrecord', recordData).then(response => {
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
    getHealthRecords: getHealthRecords,
    getHealthIndicator: getHealthIndicator,
    createRecord: createRecord,
    getHealthIndicators: getHealthIndicators,
    getRecordsByIndicator: getRecordsByIndicator
}