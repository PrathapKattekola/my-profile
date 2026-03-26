const toggleBtn = document.getElementById("chatbot-toggle");
const chatBox = document.getElementById("chatbot-box");
const messagesDiv = document.getElementById("chat-messages");

toggleBtn.onclick = () => {
    chatBox.classList.toggle("hidden");
};

function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.style.margin = "5px 0";
    msg.style.textAlign = sender === "user" ? "right" : "left";
    msg.innerHTML = `<span style="background:${sender === "user" ? "#2a5298" : "#eee"}; color:${sender === "user" ? "#fff" : "#000"}; padding:8px; border-radius:8px; display:inline-block;">${text}</span>`;
    messagesDiv.appendChild(msg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

async function sendMessage() {
    const input = document.getElementById("user-input");
    const userText = input.value;

    if (!userText) return;

    addMessage(userText, "user");
    input.value = "";

    // Call your backend API (IMPORTANT)
    const response = await fetch("/.netlify/functions/chat", {
        method: "POST",
        body: JSON.stringify({ message: userText }),
    });

    const data = await response.json();
    addMessage(data.reply, "bot");
}
