import express from "express"
import cors from "cors"

const app = express();
app.use(cors());
app.use(express.json());

let users = [
  { name: "Alice", email: "alice@example.com" },
  { name: "Bob", email: "bob@example.com" }
];

app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from frontend!"});
});

app.listen(3000, () => {
  console.log(" Server running at http://localhost:3000");
});


app.post("/api/addUser", (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json({ message: "User added successfully", user: newUser });
});

app.get("/api/User", (req, res) => {
  res.json(users);
});