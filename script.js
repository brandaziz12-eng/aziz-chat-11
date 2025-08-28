const form = document.getElementById("chatForm");
const input = document.getElementById("message");
const chatBox = document.getElementById("chatBox");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userMessage = input.value;
  chatBox.innerHTML += `<div class="msg user">👤: ${userMessage}</div>`;
  input.value = "";

  const res = await fetch("https://YOUR-BACKEND-NAME.onrender.com/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMessage })
  });

  const data = await res.json();
  chatBox.innerHTML += `<div class="msg bot">🤖: ${data.reply}</div>`;
});
