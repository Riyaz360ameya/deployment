import nodemailer from 'nodemailer'
import User from '../models/userModel'
import bcryptjs from 'bcryptjs'


export const sendEmail = async ({ email, emailType, userId }) => {
    try {
        //create hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        console.log(hashedToken, "hashedtoken")
        //update with user id
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 })
        }


        let transport = nodemailer.createTransport({ //var to let changed
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "2c08790f23a149",
                pass: "3e6de38a745224"
            }
        });

        const mailOptions = {
            from: "riyazulahad786@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a>to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy and paste link on browser to verify you email <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`

        }
        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse
    } catch (error) {
        throw new Error(error.message)
    }
}