import axios from "axios";

const app = document.querySelector("#app");
app.innerHTML = `
      <form id="userForm">
        <input type="text" id="name" placeholder="Enter name" required>
        <input type="email" id="email" placeholder="Enter email" required>
        <button type="submit">Submit</button>
      </form>
      <p id="message"></p>
      <table id="userTableBody">
       </table>
    `;
async function loadUsers() {
  try {
    
    const res = await axios.get("http://localhost:3000/api/User");
    const users = res.data;

    const tableBody = document.getElementById("userTableBody");
    tableBody.innerHTML = ""; // clear previous rows

    users.forEach((user) => {
      const row = document.createElement("tr");
      row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
          `;
      tableBody.appendChild(row);
    });
  } catch (err) {
    console.error("Error fetching users:", err.message);
  }
}

loadUsers();
const form = document.getElementById("userForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  try {
    const res = await axios.post("http://localhost:3000/api/addUser", {
      name,
      email,
    });

    message.textContent = `✅ ${res.data.message}: ${res.data.user.name} (${res.data.user.email})`;
    form.reset();
  } catch (err) {
    message.textContent = `❌ Error: ${
      err.response?.data?.error || err.message
    }`;
  }
});
