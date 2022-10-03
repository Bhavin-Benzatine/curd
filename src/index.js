const express = require("express");
const app = express();
const port = 6000;

require("./db/db");

const userSchema = require("./model/userSchema");
const blogSchema = require("./model/blogSchema");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/register", async (req, res) => {
  try {
    const addUser = new userSchema(req.body);
    const result = await addUser.save();

    res.status(201).send(result);
  } catch (err) {
    res.send(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
      const loginuser = await userSchema.findOne({ username });

      if (loginuser) {
        const token = jwt.sign(
          { user_id: loginuser._id, username },
          "hellohellohellohellohellohellohello",
          {
            expiresIn: "2h",
          }
        );
        loginuser.token = token;

        res.status(201).send(loginuser);
      } else {
        res.status(401).send("unauthorized exception");
      }
    }
  } catch (err) {
    res.send(err);
  }
});

app.post("/blog", auth, async (req, res) => {
  try {
    const addBlog = new blogSchema(req.body);
    const result = await addBlog.save();

    res.status(201).send(result);
  } catch (err) {
    res.send(err);
  }
});

app.get("/blog", auth, async (req, res) => {
  try {
    const allBlog = await blogSchema.find();
    res.status(200).send(allBlog);
  } catch (err) {
    res.send(err);
  }
});

app.get("/blog/:id", auth, async (req, res) => {
  try {
    id = req.params.id;
    const blogData = await blogSchema.findById(id);
    if (blogData) {
      res.status(200).send(blogData);
    }
  } catch (err) {
    res.status(400).send("blog not found");
  }
});

app.listen(port, () => {
  console.log(`server start on ${port}`);
});
