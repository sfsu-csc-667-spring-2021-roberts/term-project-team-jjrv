/* ====================================*/
/* ============ pusher ================*/
/* ====================================*/
// Enable pusher logging - don't include this in production
//Pusher.logToConsole = true;

let pusher = new Pusher("9b6ab1d354f0296f318e", {
  cluster: "us3",
});
let channel = pusher.subscribe("lobby");

/* ======= Chat Room ======== */
channel.bind("chat-msg", function (data) {
  let { username, message, timestamp } = data;

  const chatBox = document.getElementById("chat-box");
  const div = document.createElement("div");

  div.classList.add("message");
  div.innerHTML = `<p class="chat-messages"><span> [${timestamp}]</span>
    <strong>${username}:</strong> ${message}</p>`;
  chatBox.append(div);

  // scrolldown automatically
  chatBox.scrollTop = chatBox.scrollHeight;
});

const chatForm = document.getElementById("chat-form");
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const msg = e.target.elements.msg.value;

  let response = await fetch("/auth/chatMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      msg: msg,
    }),
  });

  response = await response.json();

  // Clear text input field for user
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

/* ============ Buttons ================ */
