import React from "react";

const LoginPage = () => {
    const [purpose, setPurpose] = useState("login");

    const validationSchema = Yup.object({
        username: Yup.string()
            .min(4, "Must be 4 characters or more!")
            .max(15, "Must be 15 characters or less!")
            .required("Username is required"),
        password: Yup.string().required("Password is required"),
        ...(purpose == "register" && {
            email: Yup.string()
                .email("Invalid email")
                .required("Email is required"),
            name: Yup.string().required("Name is required"),
            phone: Yup.string()
                .matches(/^[0-9]+$/, "Phone number must contain only numbers")
                .min(10, "Phone number must be 10 digits")
                .max(10, "Phone number must be 10 digits")
                .required("Phone number is required"),
            address: Yup.string().required("Address is required"),
        }),
    });
    return (
        <div className="flex w-full h-screen">
            {/*//* Image */}
            <div className="w-1/2 flex flex-center">
                <img
                    src="./image/login.png"
                    alt="Description"
                    className="max-w-[448px] w-full object-cover"
                />
            </div>

            {/*//* Form  */}
        </div>
    );
};

export default LoginPage;
("");
