const mongoose = require("mongoose");
const Users = mongoose.model("Users", { username: String, password: String });

function conn() {
  try {
    console.log("connecting to server...");
    mongoose.connect("mongodb://phil:pass@db:27017/db", {
      useNewUrlParser: true,
    });
    console.log("Successfully connnected to mongo server...");
    return mongoose;
  } catch (error) {
    console.log(error);
  }
}

function create_admin() {
  Users.find({ username: "phil", password: "pass" }, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      if (user.length > 0) {
        console.log(`Admin found`);
        return user;
      } else {
        console.log("No admin found, creating admin...");
        const phil = new Users({
          username: "phil",
          password: "pass",
          perms: "admin",
        });
        phil.save();
        return phil;
      }
    }
  });
}

function clr_db() {
  Users.deleteMany({ username: "phil" }, (err) => {
    if (err) console.log(err);
    console.log("Successful deletion");
  });
}

module.exports = { conn, create_admin, clr_db, Users };
