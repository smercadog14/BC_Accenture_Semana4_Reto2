//import module required from npm
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  //search for jwtToken from header -> authorization
  let jwtToken = req.header("Authorization");
  //validate if exist?
  if (!jwtToken)
    return res.status(401).send("Autoriazicion rechazada: no hay un token");
  //if exist we split and get only the jwtToken (pisition 1 from new array)
  jwtToken = jwtToken.split(" ")[1];
  //validate if it's ok?
  if (!jwtToken)
    return res.status(401).send("Autoriazicion rechazada: no hay un token");

  //validate if the jwtToken is our token

  //user try-catch for anything exeption
  try {
    //get payload and verify if the jwtToken have our secret word
    const payload = jwt.verify(jwtToken, "secetJWT-Reminder"); //this method return true or false
    //give true value to the user
    req.user = payload;
    //we allow to continue
    next();
  } catch (error) {
    //any error we send alert message
    return res.status(401).send("Autorizacion rechazada: token no valido");
  }
};

//export module

module.exports = auth;
