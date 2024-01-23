import * as Yup from "yup"
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
export const loginSchema = Yup.object({
    email: Yup.string().email().required("Please Enter Email"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(
            passwordRegex,
            "Password must contain at least 8 characters, one lowercase letter, one uppercase letter, and one number"
        )
        .required("Enter Your Password"),
});
export const signUpSchema = Yup.object({
    name: Yup.string().min(1).max(25).required("Please enter your Name"),
    email: Yup.string().email().required("Please enter your Email"),
    password: Yup.string().min(3).required("Please enter your Password"),
    confirmPassword: Yup.string().required().oneOf([Yup.ref('password'), null], "Password Must match")
})