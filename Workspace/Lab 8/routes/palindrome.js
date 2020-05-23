const express = require("express");
const router = express.Router();

router.get("/", async(req,res) =>
{
    res.render("palindrome", {title: "The Best Palindrome Checker in the World!"})
});

module.exports = router;