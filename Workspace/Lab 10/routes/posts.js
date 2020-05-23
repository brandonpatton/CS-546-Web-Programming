const express = require('express');
const router = express.Router();
const users = require('./users')
const session = require('express-session')
const bcrypt=require('bcrypt');


router.get('/', async (req, res) => {
    if(req.session.loggedIn == true){
		res.redirect('/private');
	} else {
		res.render('login', {title: 'Login'})
	}
});


router.post('/login', async (req, res) => {
    var validPW = false;
    const uname = req.body.username;
    const pword = req.body.password;
    for (let i = 0; i < users.length; i++){
        try {
            compared = await bcrypt.compare(pword, users[i].hashedPassword);
            validPW = true;
        } catch (e) {
            validPW = false;
        }
        if(uname == users[i].username && validPW){
            req.session.loggedIn = true;
            req.session.userInfo = users[i];                    
            delete req.session.userInfo.hashedPassword;
            break;
        }
    }
    if(validPW == false){
        res.status(401).render('login', {title: "Login", error: 'Invalid Username or Password'});
    } else {
        res.redirect('/private');
    }
});

router.get('/private', async (req, res) => {
	res.render('private', {title: "Private", userInfo: req.session.userInfo});
});

router.get('/logout', async (req, res) =>{
    if (req.session.loggedIn == true){
        req.session.destroy();	
        res.render('logout');
    } else {
        res.render('error', {title: "You don't have access to this page"});
    }
});


module.exports = router;