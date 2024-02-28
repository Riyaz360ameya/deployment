import * as Yup from "yup"
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const nameRegex = /^[A-Za-z\s]+$/;
export const loginSchema = Yup.object({
    email: Yup.string().email().required("Please Enter your Email"),
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
    organization: Yup.string().min(2).max(40).required("Please enter your Organization"),
    // newOrganization: Yup.string().min(3).max(40).required("Please enter your Organization"),
    newOrganization: Yup.string().min(2).max(40)
        .test({
            name: 'conditionalRequired',
            exclusive: true,
            message: 'Please enter your New Organization Name',
            test: function (value) {
                // Only require newOrganization if organization is 'Other'
                return this.parent.organization === 'Other' ? !!value : true;
            },
        }),
    email: Yup.string().email().required("Please enter your Email"),
    password: Yup.string().min(8, "Password must be at least 8 characters")
        .matches(passwordRegex, "Password: min 8 characters, 1 lowercase, 1 uppercase, 1 number").required("Enter Your Password"),
    confirmPassword: Yup.string().required().oneOf([Yup.ref('password'), null], "Password must match")
});
export const uploadProjectDetailsSchema = Yup.object({
    ventureName: Yup.string().matches(nameRegex, "Invalid name format").min(1).max(25).required("Please enter your ventureName"),
    projectPlace: Yup.string().matches(nameRegex, "Invalid name format").min(1).max(25).required("Please enter your projectPlace"),
    email: Yup.string().email().required("Please enter your Email"),
    ventureType: Yup.string().min(3).max(40).required("Please enter your ventureType"),
    vision: Yup.string().min(3).max(40).required("Please enter your vision"),
    projectUsp: Yup.string().min(3).max(40).required("Please enter your projectUsp"),
    contact: Yup.string().matches(/^[0-9]{10}$/, "Contact must be a 10-digit number").required("Please enter your contact"),
    specification: Yup.string().min(3).max(40).required("Please enter your specification"),
    amenities: Yup.string().min(3).max(40).required("Please enter your amenities"),
    pages: Yup.string().min(1).max(40).required("Please enter your pages"),
    brochureLanguage: Yup.string().min(3).max(40).required("Please enter your brochureLanguage"),
    brochureBudget: Yup.string().min(3).max(40).required("Please enter your brochureBudget"),
    leafLet: Yup.string().min(3).max(40).required("Please enter your leafLet"),
    ventureDescription: Yup.string().min(3).max(40).required("Please enter your ventureDescription"),
    estimatedDeliveryDate: Yup.string().min(3).max(40).required("Please enter your estimatedDeliveryDate"),
    siteAddress: Yup.string().min(3).max(40).required("Please enter your siteAddress"),
    previousVenture: Yup.string().min(3).max(40).required("Please enter your previousVenture"),
    officeAddress: Yup.string().min(3).max(40).required("Please enter your officeAddress"),
    location: Yup.string().min(3).max(40).required("Please enter your location"),
    projectOverview: Yup.string().min(3).max(40).required("Please enter your projectOverview"),
})