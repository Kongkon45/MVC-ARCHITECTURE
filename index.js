require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
const users = [
  {
    name: "Kongkon jowarder",
    age: 22,
  },
  {
    name : "dalim",
    age : 23
  }
];
const htmlForm = `
    <form action="/users" method="POST">
        <input type="text" name="name" id="name" placeholder="Enter your name ...">
        <input type="number" name="age" id="age" placeholder="Enter your age ...">
        <button type="submit">Save user</button>
    </form>
`;

app.get("/users", (req, res) => {
  res.send(htmlForm);
});
app.post("/users", (req, res)=>{
    const name = req.body.name;
    const age = Number(req.body.age);
    const user = {
        name,
        age
    }
    users.push(user)
    res.status(200).json({
        success : true, 
        users
    })
})
app.use((req, res, next) => {
  res.status(404).json({
    message: "This url is not found",
  });
});
app.listen(PORT, () => {
  console.log(`Server is running successfully at http://localhost:${PORT}`);
});
