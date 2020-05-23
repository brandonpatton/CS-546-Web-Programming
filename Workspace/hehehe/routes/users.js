const express=require("express");
const router=express.Router();
const userData=require("../data/users");
const session = require('express-session');
const uuid=require('uuid/v4');

/*
async function isAuth(req)
{
    try
    {
        var user=await userData.findUserBySID(req.cookies.AuthCookie);
        if (req.cookies.AuthCookie!==undefined && req.cookies.AuthCookie==user.sessionID && user.sessionID!==undefined)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    catch(e)
    {
        return false;
    }
}*/

router.get("/", async(req, res) =>
{
    if(req.session.loggedIn==true)
    {
        res.redirect("/private");
    }
    else
        res.render("login", {title:"Login to your account!"});
});

router.post("/login", async(req, res) =>
{
    const name=req.body.username;
    const pw=req.body.password;

    var userExists=false;
    var correctPW=false;
    var user;

    try
    {
        user=await userData.findUser(name);
        userExists=true;
    }
    catch(e)
    {
        userExists=false;
    } 

    try
    {
        if(await userData.checkPW(name,pw));
            correctPW=true;
    }
    catch(e)
    {
        correctPW=false;
    } 

    if(userExists && correctPW)
    {
        res.cookie('name', 'AuthCookie');
        res.cookie.AuthCookie.loggedIn = true;
        res.redirect("/private");
    }
    else
    {
        res.render("login", {error: "Invalid Username/Password"});
    }
});

router.get("/private", async(req,res) =>
{
    //const username=req.cookies.AuthCookie;
    const sid=req.cookies.AuthCookie;
    //console.log(await isAuth(req,res));
    console.log(req.cookies.AuthCookie);
    if(req.cookies.AuthCookie.loggedIn==true)
    {
        //console.log("authorized");
        //let user=await userData.findUser(username);
        let user=await userData.findUserBySID(sid);

        res.render("profile", {data:user});
    }
    else
    {
        res.status(403).render("error", {title: "Error 403: User not logged in"});
    }
});

router.get("/logout", async(req,res) =>
{
    res.cookie("AuthCookie", "", {expires:new Date()});
    res.clearCookie("AuthCookie");
    res.render("logout", {title:"You have been logged out"});
});

module.exports=router;