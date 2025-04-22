const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendInvoiceEmail = async (toEmail, payment) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: 'Payment Successful - Your Video Streaming Plan',
    html: `
      <h1>Thank you for your payment!</h1>
      <p>Your ${payment.planType} plan has been activated.</p>
      <h3>Invoice Details</h3>
      <p>Invoice Number: ${payment.invoiceNumber}</p>
      <p>Amount: ₹${payment.amount}</p>
      <p>Date: ${payment.createdAt.toDateString()}</p>
      <p>Transaction ID: ${payment.transactionId}</p>
    `
  };

  await transporter.sendMail(mailOptions);
};