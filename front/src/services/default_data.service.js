import http from '../http-common'

async function getDefaultData() {
    var response = await http.get('default/defaultdata');
    return response.data;
}

async function getTrainingProgram(id) {
    var response = await http.get('/default/get_training_program', { params: { id: id } });
    return response.data;
}

export default {
    getDefaultData,
    getTrainingProgram
}