import http from '../http-common'

async function getAllEventsAndRecords() {
    // return http.get('events/get_all_events_and_records').then(response => {
    //     console.log(response)
    //     return response;
    // })
    var events = await http.get('events/get_all_events_and_records');
    console.log(events);
    return events;
}

async function saveEvent(event) {
    return http.post('events/save_event', event).then(response => {
        return response;
    })
}

async function saveHealthRecord(health_record) {
    return http.post('events/save_health_record', health_record).then(response => {
        return response;
    })
}

async function deleteEvent(event) {
    return http.post('events/delete_event', event).then(response => {
        return response;
    })
}

async function deleteHealthRecord(health_record) {
    return http.post('events/delete_health_record', health_record).then(response => {
        return response;
    })
}

export default {
    getAllEventsAndRecords: getAllEventsAndRecords,
    saveEvent: saveEvent,
    saveHealthRecord: saveHealthRecord,
    deleteEvent: deleteEvent,
    deleteHealthRecord: deleteHealthRecord
}