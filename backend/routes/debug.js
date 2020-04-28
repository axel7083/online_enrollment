const router = require('express').Router();

/*Models*/
const User = require('../models/User.model');
const UserSession = require('../models/UserSession.model');
const Course = require('../models/Course.model');


router.route('/users').get((req,res)=> {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/sessions').get((req,res)=> {
    UserSession.find()
        .then(sessions => res.json(sessions))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/courses').get((req,res)=> {
    Course.find()
        .then(sessions => res.json(sessions))
        .catch(err => res.status(400).json('Error: ' + err));
});






/*This is an example of function to give data to client (slowly) for example for big operation
* where we want to inform the client the progress we could use it*/
router.route('/write').get((req,res)=> {
    write(res)
        .then(() => {
            res.end();
        });
});

async function write(res) {
    res.write("<div>Hello world</div>");
    await sleep(1000);
    res.write("<div>Hello world</div>");
    await sleep(1000);
    res.write("<div>Hello world</div>");
    await sleep(1000);
    res.write("<div>Hello world</div>");
    await sleep(1000);
    res.write("<div>Hello world</div>");
}


function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}



module.exports = router;
