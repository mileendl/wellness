const { Op } = require('sequelize');
var db = require('../config/db.config.js');

async function getAllEventsAndRecordsByUserId(id) {
    const events = await db.event.findAll({ include: db.tag, where: { user_id: id } });
    const healthRecords = await db.health_record_item.findAll({ include: db.health_indicator, where: { user_id: id } });
    var data = { healthRecords: healthRecords, events: events };
    return data;
}

async function getAllEventsAndRecordsByUser(username) {
    const user = await db.user.findOne({ where: { username: username } });
    return await getAllEventsAndRecordsByUserId(user.id);
}

async function saveHealthRecord(health_record_item, username) {
    health_record_item.indicator_id = health_record_item.indicator.id;
    if (!health_record_item.user_id) {
        user = await db.user.findOne({ where: { username: username } });
        health_record_item.user_id = user.id;

    }

    var id;
    if (health_record_item.id !== undefined) {
        await db.health_record_item.update(health_record_item, { where: { id: health_record_item.id } });
        id = health_record_item.id;
    } else {
        user = await db.health_record_item.create(health_record_item);
        id = user.id;
    }
    return id;
}

async function saveEvent(event, username) {
    event.tag_id = event.tag.id;
    if (!event.user_id) {
        const user = await db.user.findOne({ where: { username: username } });
        event.user_id = user.id;
    }

    var id;
    if (event.id !== undefined) {
        await db.event.update(event, { where: { id: event.id } });
        id = event.id;
    } else {
        var user = await db.event.create(event);
        id = user.id;
    }
    return id;
    //return await getAllEventsAndRecordsByUserId(health_record_item.user_id);
}

async function deleteHealthRecord(health_record_item/*, username*/) {
    console.log(health_record_item)
    await db.health_record_item.destroy({ where: { id: health_record_item.id } });
}

async function deleteEvent(event/*, username*/) {
    console.log(event);
    await db.event.destroy({ where: { id: event.id } });
}


async function setDismissedEvents(events) {
    console.log('boooba');
    return db.event.update({ isDismissed: 1 }, {
        where: {
            id: {
                [Op.or]: events
            }
        }
    }).then(() => {
        console.log('kik');
    })
}
module.exports = { getAllEventsAndRecordsByUser, saveEvent, saveHealthRecord, deleteEvent, deleteHealthRecord, setDismissedEvents }