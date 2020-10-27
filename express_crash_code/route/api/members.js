const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../members');

bodyParser = require('body-parser').json();

// Get All Members
router.get('/', (req, res) => res.json(members));

// Get single memeber
router.get('/:id', (req, res) => {
    const found = members.some( memeber => memeber.id === parseInt(req.params.id) );
    if(found){
        res.json(members.filter(memeber => memeber.id === parseInt(req.params.id)));
    }else{
        res.status(400).json({ msg: `No Member With The Id ${req.params.id} ...`});
    }


});
// Add Member
router.post('/', bodyParser, (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email  : req.body.email,
        status: 'active'
    };


    if(!newMember.name || !newMember.email){
        return res.status(400).json({msg: 'Please Fill out the name and email!'});
    }

    members.push(newMember);
    res.json(members);
    // res.redirect('/');
});

// Update Member
router.put('/:id', (req, res) => {

    const found = members.some( memeber => memeber.id === parseInt(req.params.id) );
    if(found){
        const updMember = req.body;
        members.forEach(memeber => {
            if (memeber.id === parseInt(req.params.id)){
                memeber.name = updMember.name ? updMember.name : memeber.name;
                memeber.email = updMember.email ? updMember.email : memeber.email;
                res.json({msg: `the member was updated !`, memeber});
            }
        });

    }else{
        res.status(400).json({ msg: `No Member With The Id ${req.params.id} ...`});
    }

});

// Remove single memeber
router.delete('/:id', (req, res) => {
    const found = members.some( memeber => memeber.id === parseInt(req.params.id) );
    if(found){
        res.json({msg: "the member was deleted!", members: members.filter(memeber => memeber.id !== parseInt(req.params.id)) });
    }else{
        res.status(400).json({ msg: `No Member With The Id ${req.params.id} ...`});
    }


});
module.exports = router;