import * as Yup from "yup"
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const nameRegex = /^[A-Za-z\s]+$/;
export const loginSchema = Yup.object({
    email: Yup.string().email().required("Please Enter Email"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(
            passwordRegex,
            "Password: min 8 characters, 1 lowercase, 1 uppercase, 1 number"
        )
        .required("Enter Your Password"),
});

export const signUpSchema = Yup.object({
    firstName: Yup.string().matches(nameRegex, "Invalid name format").min(1).max(25).required("Please enter your First Name"),
    lastName: Yup.string().matches(nameRegex, "Invalid name format").min(1).max(25).required("Please enter your Last Name"),
    organization: Yup.string().min(3).max(40).required("Please enter your Organization"),
    email: Yup.string().email().required("Please enter your Email"),
    password: Yup.string().min(8, "Password must be at least 8 characters")
        .matches(passwordRegex, "Password: min 8 characters, 1 lowercase, 1 uppercase, 1 number").required("Enter Your Password"),
    confirmPassword: Yup.string().required().oneOf([Yup.ref('password'), null], "Password must match")
})
