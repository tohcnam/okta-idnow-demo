let uniqid = require('uniqid');
let Email = require('../models/emails').Email;
let express = require('express');
let router = express.Router();
let auth = require('../controllers/auth');

router.get('/', auth.oidc.ensureAuthenticated(), async (req, res) => {
    res.send(await Email.find());
});
router.post('/', async (req, res) => {
    let reqBody = req.body;
    let newEmail = new Email({
        id: uniqid(),
        email: reqBody.email,
        name: reqBody.name,
        message: reqBody.message,
        date: new Date()
    });
    await newEmail.save();
    res.send('Accepted');
});
router.delete('/:id', auth.oidc.ensureAuthenticated(), async (req, res) => {
    await Email.deleteOne({id: req.params.id});
    res.send('Deleted');
});

module.exports = router;