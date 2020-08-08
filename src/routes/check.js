let myObject = {
    "ircEvent": "PRIVMSG",
    "method": "newURI",
    "regex": "^http://.*"
};
delete myObject.regex;
console.log(myObject);