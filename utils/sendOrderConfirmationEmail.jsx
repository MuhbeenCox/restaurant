import nodemailer from "nodemailer";

// Configure your email transport using environment variables or hardcoded values
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOrderConfirmationEmail = async (to, orderDetails) => {
  console.log(orderDetails, "check detail");

  const cartItemsHtml = orderDetails.cartProducts
    .map(
      (item) =>
        `<li key=${item.productId}><strong>${item.name}</strong> - ${item.quantity}</li>`
    )
    .join("");

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject: "Top Taste Order Confirmation",
    html: `
        <h3>Thank you for your order!</h3>
        <p>Your order ID is <strong>${orderDetails?.orderId}</strong>.</p>
        <p>Name: <strong>${orderDetails?.name}</strong>.</p>
        <p>Phone: <strong>${orderDetails?.phone}</strong>.</p>
        <p>Address: <strong>${orderDetails?.address}</strong>.</p>
        <h4>Order Details:</h4>
        <ul>
          ${cartItemsHtml}
        </ul>
        <p>Payment: ${orderDetails.paid ? "Paid" : "Cash On Deivery"}</p>
         <p>Total: ${orderDetails.totalPrice}</p>

        <p>Your order will be delivered within 30 minutes.Thank you!</p>
      `,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

export default sendOrderConfirmationEmail;
