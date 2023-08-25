const contactMail = (fullName,company,email,message) => {
    return `
    <!DOCTYPE html>
<html>
<head>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap');

    /* Reset some default styles */
    body, p, h1, h2, h3 {
      margin: 0;
      padding: 0;
    }

    body {
      font-family: EB Garamond, serif;
      background-color: #f2f2f2;
    }

    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      overflow: hidden;
    }

    .header {
      background-color: #995F25;
      color: #ffffff;
      padding: 20px;
      text-align: center;
    }

    .content {
      padding: 20px;
    }

    .info-item {
      margin-bottom: 10px;
    }

    .info-label {
      font-weight: bold;
    }

    .info-value {
      margin-left: 5px;
    }

    .message {
      margin-top: 20px;
    }

    .footer {
      background-color: #f2f2f2;
      padding: 10px;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>New Contact Form Submission</h1>
    </div>
    <div class="content">
      <div class="info-item">
        <span class="info-label">Full Name:</span>
        <span class="info-value">${fullName}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Company Name:</span>
        <span class="info-value">${company}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Email:</span>
        <span class="info-value">${email}</span>
      </div>
      <div class="message">
        <h2>Message:</h2>
        <p>${message}</p>
      </div>
    </div>
    <div class="footer">
      <p>This email was sent from your the Sabmaf website contact form</p>
    </div>
  </div>
</body>
</html>
`;
}

module.exports = contactMail;
