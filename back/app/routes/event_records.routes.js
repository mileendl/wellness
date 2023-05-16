var express = require("express");
var router = express.Router();

var ERRepository = require("../repository/events_records.repository");
//Файл для запросов, связанных с событиями и записями о здоровье

router.get('/get_all_events_and_records',
    (req, res, next) => {
        ERRepository.getAllEventsAndRecordsByUser(req.user).then(data => {
            res.json(data);
        }).catch(err => {
            console.log(err);
            res.status(500).send();
        })
    }
)

router.post('/save_event',
    (req, res, next) => {
        ERRepository.saveEvent(req.body, req.user).then(data => {
            console.log(data)
            res.json(data);
            //next();
        }
        ).catch(err => {
            console.log(err);
            res.status(500).send();
        })
    }
)

router.post('/save_health_record',
    (req, res, next) => {
        ERRepository.saveHealthRecord(req.body, req.user).then(data => {
            res.json(data);
            //next();
        }
        ).catch(err => {
            console.log(err);
            res.status(500).send();
        })
    }
)

router.post('/delete_event',
    (req, res, next) => {
        ERRepository.deleteEvent(req.body).then(
            next()
        ).catch(err => {
            console.log(err);
            res.status(500).send();
        })
    }
)

router.post('/delete_health_record',
    (req, res, next) => {
        ERRepository.deleteHealthRecord(req.body).then(
            next()
        ).catch(err => {
            console.log(err);
            res.status(500).send();
        })
    }
)

router.post('/setEventsDismissed',
    (req, res, next) => {
        // console.log('karamba')
        // console.log(req.body);
        ERRepository.setDismissedEvents(req.body).then(() => {
            // console.log('lopa');
            res.status(200);
            next();
        }
        ).catch(err => {
            console.log(err);
            res.status(500).send();
        })
    }
)

module.exports = router;