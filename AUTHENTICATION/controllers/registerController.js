const userDB = {
    users : require('../model/users.json'),
    setUsers : function(data) {this.users = data}
}

const fsPromises = require('fs').promises;
const path = require('path');
const bycrypt = require('bcrypt');
const req = require('express/lib/request');

const handleNewUser = async(req, res) => {
    const {user, pwd} = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message' : 'Password and Username are required'});
    const duplicate = userDB.users.find(person => person.username === user);
    if (duplicate) return res.sendStatus(409);
    try {
        
    } catch (err) {
        res.status(500).json({ 'message' : err.message });
    }
};
