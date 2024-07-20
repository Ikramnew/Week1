function sendEmail(event) {
    event.preventDefault();  

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Validator form
    if (!name || !email || !phone || !subject || !message) {
        alert("Please fill out all required fields.");
        return;
    }

    // Construct the Gmail link
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=ikramjundulloh@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
    )}`;

    // Open the Gmail compose window
    window.open(gmailLink, '_blank');

    // Clear the form
    document.getElementById('myForm').reset();
}
