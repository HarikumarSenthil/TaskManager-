import nodemailer from "nodemailer";

// Create a transporter object using SMTP settings
const transporter = nodemailer.createTransport({
  service: process.env.SERVICE,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendEmail = async (mail: String, subject: string, body?: string) => {
  const mailOptions = {
    from: `${process.env.EMAIL}`,
    to: `${mail}`,
    subject: subject,
    html: body,
  };

  await transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
      console.log(error);
    } else {
      return true;
    }
  });
};
export { sendEmail };
