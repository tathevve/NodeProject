const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const jwt = require("jsonwebtoken");
let userList = "./Constants/user.json";

const getUsers = () => {
  try {
    return fs.readFileSync(userList, "utf8");
  } catch (e) {
    return e;
  }
};

const register = (req, res) => {
  let users = getUsers();
  users = JSON.parse(users);
  const uuid = uuidv4();

  const { name, email, password } = req.body;

  if (!(email && password && name)) {
    res.status(400).send("All input is required");
  }

  let checkExist = users.find((user) => user?.email === email);
  console.log(checkExist, "check");

  if (checkExist) {
    return res.status(409).send("User Already Exist. Please Login");
  }
  //   encryptedPassword = bcrypt.hash(password, 10);
  //   console.log(encryptedPassword.then((a) => console.log(a)), "encrypt");

  let newUser = {
    id: uuid,
    name: name,
    email: email.toLowerCase(),
    password: password,
  };

  const token = jwt.sign(
    { user_id: newUser.id, email },
    "secretkeyappearshere",
    {
      expiresIn: "2h",
    }
  );

  newUser.token = token;

  users.push(newUser);

  users = JSON.stringify(users, null, 2);
  fs.writeFile(userList, users, (err) => {
    if (err) return err;
  });

  res.status(200).send(users);
};

const signIn = (req, res) => {
  let users = getUsers();
  users = JSON.parse(users);

  let { email, password } = req.body;

  if (!(email && password)) {
    res.status(400).send("All input is required");
  }

  let checkLogin = users.find((user) => user?.email === email);

  console.log(checkLogin, "check");

  if (checkLogin && checkLogin.password === password) {
    const token = jwt.sign(
      { user_id: checkLogin.id, email },
      "secretkeyappearshere",
      {
        expiresIn: "2h",
      }
    );

    checkLogin.token = token;

    let filteredUser = users.filter((user) => user.id != checkLogin.id);

    filteredUser.push(checkLogin);
    filteredUser = JSON.stringify(filteredUser, null, 2);

    fs.writeFileSync(userList, filteredUser, (err) => {
      if (err) return err;
    });

    filteredUser = JSON.parse(filteredUser);
    res.status(200).json(filteredUser);
  }
  res.status(400).send("Invalid Credentials");
};

module.exports = {
  getUsers,
  register,
  signIn,
  //   logOut,
};
