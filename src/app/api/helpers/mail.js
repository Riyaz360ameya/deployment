import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'
import otpVerifyModel from '../models/otpVerifyModel.js'
import userModel from '../models/User/userModel.js'
export const sendEmail = async ({ email, emailType, userId }) => {
    try {
        //create hashed token
        if (emailType !== "FILES_VERIFIED") {
            const hashedToken = await bcryptjs.hash(userId.toString(), 10)
            console.log(hashedToken, "hashedtoken")
            //update with userModel id
        }
        let OTP = `${Math.floor(1000 + Math.random() * 9000)}`;
        if (emailType === "VERIFY") {
            await userModel.findByIdAndUpdate(userId,
                { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })
        } else if (emailType === "Password RESET") {
            await userModel.findByIdAndUpdate(userId,
                { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 })
            const saltRound = 10;
            const hashedOtp = bcryptjs.hashSync(OTP, saltRound);
            const newOtpVerification = new otpVerifyModel({
                email: email,
                otp: hashedOtp,
                createdAt: Date.now(),
                expiresAt: Date.now() + 3600000,
            });
            await newOtpVerification.save();
        }
        let transport = nodemailer.createTransport({
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
            subject: emailType === "VERIFY" ? "verify your email" : emailType === "FILES_VERIFIED" ? "Blocs Files verification status" : "Reset your password",
            html: emailType === "VERIFY" ?
                `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a>to verify your email or copy and paste link on browser to verify you email <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
                : emailType === "FILES_VERIFIED" ?
                    `<p>Your files have been verified successfully 😊</p>` :
                    `<p>Email verification Code is <b>${OTP}</b> from TectoGen. Ignore this mail if this is not done by you. </p>`
        }
        const mailResponse = await transport.sendMail(mailOptions)
     
        return mailResponse
    } catch (error) {
        console.log(error.message, '----------emil send')
        throw new Error(error.message)
    }
}