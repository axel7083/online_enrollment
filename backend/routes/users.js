const router = require('express').Router();
const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

router.route('/signup').post((req, res) => {

    const user = new User({
        username: req.body.username,
        email: req.body.email,
    });

    user.password = user.generateHash(req.body.password);

    user.save().then(
        () => {
            res.status(201).json({
                message: 'User added successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(500).json({
                error: error
            });
        }
    );
});

router.route('/login').post((req, res) => {

    User.findOne({ email: req.body.email }).then(
        (user) => {
            if (!user) {
                return res.status(401).json({
                    error: new Error('User not found!')
                });
            }

            if(user.validPassword(req.body.password))
            {
                const token = jwt.sign(
                    { userId: user._id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' });
                res.status(200).json({
                    userId: user._id,
                    token: token
                });

            }
            else
            {
                return res.status(401).json({
                    error: new Error('Incorrect password!')
                });
            }
        }
    ).catch(
        (error) => {
            res.status(500).json({
                error: error
            });
        }
    );
});






router.route('/').get(auth,(req,res)=> {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').get((req,res)=> {
   User.findById(req.params.id)
       .then(user => res.json(user))
       .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req,res)=> {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('Deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req,res)=>{
    User.findById(req.params.id)
        .then(user => {
            user.username = req.body.username;
            user.password = req.body.password;

            user.save()
                .then(() => res.json('Saved!'))
                .catch(err => res.status(400).json('Error: ' + err));

        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
