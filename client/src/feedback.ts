import "./style.css";
const feedbackForm: HTMLInputElement = document.getElementById("feedback-form") as HTMLInputElement;
const feedbackInput: HTMLInputElement = document.getElementById("feedbackText") as HTMLInputElement;
const emailInput: HTMLInputElement = document.getElementById("feedbackUsername") as HTMLInputElement;

// Handle when a user submits feedback
feedbackForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get the feedback text from the DOM and assign it to a variable
    let feedback = feedbackInput.value;
    // Get the username text and add it to a variable
    let email = emailInput.value.trim();

    // Create an object with the username and feedback
    const newFeedback = {
        feedback,
        email,
        feedbackType: "user-feedback-relay-badger-app-v0.0",
    };

    // Fetch POST request to the server
    fetch("api/feedback", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newFeedback),
    })
        .then((res) => res.json())
        .then(() => {
            alert("✅ Relay Badger received your message! 🦡");
            email = "";
            feedback = "";

            // Reset Feedback Form
            emailInput.value = "";
            feedbackInput.value = "";
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("⛔ Failed to your message. Please try again later. 🦡");
        });
});
