import React from "react";
import { Form, Formik, useFormikContext } from "formik";
import { useEffect, useState } from "preact/hooks";
import * as Yup from "yup";
import FormInput from "./../../elements/FormInput";
import Button from "./../../elements/Button";
import AuthService from "../../services/AuthService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
    const [purpose, setPurpose] = useState("login");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const accessToken = JSON.parse(localStorage.getItem("accessToken"));
        if (accessToken) {
            navigate("/home");
        }
    }, [navigate]);

    //* Set up for Formik
    const registerFields =
        purpose == "register" ? ["email", "name", "phone", "address"] : [];
    const fields = ["username", "password", ...registerFields];

    const gridCol = purpose == "login" ? "grid-cols-1" : "grid-cols-2";

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

    //* Title
    let title = "";

    if (purpose === "register") {
        title = "Register an account";
    } else if (purpose === "login") {
        title = "Login";
    }

    //* resetForm: Reset về init values, xóa error
    //* Thêm resetForm vào dependencies để cho chắc chắn, cơ bản thì bỏ cũng đc
    const FormReset = ({ setPurpose }) => {
        const { resetForm } = useFormikContext();
        useEffect(() => {
            resetForm();
        }, [setPurpose, resetForm]);
        return null;
    };

    const handleError = (error) => {
        let message = "An unexpected error occurred. Please try again.";

        if (error.code) {
            switch (error.code) {
                case "ERR_BAD_REQUEST":
                    message =
                        purpose == "login"
                            ? "Incorrect username or password."
                            : "Username may already be in use.";
                    break;
                case "ERR_NETWORK":
                    message =
                        "Service temporarily unavailable. Please try again later.";
                    break;
                default:
                    message =
                        "An unexpected error occurred with code: " + error.code;
                    break;
            }
        } else if (error.response) {
            switch (error.response.status) {
                case 401:
                    message = "Unauthorized. Please login again.";
                    break;
                case 404:
                    message = "Requested resource not found.";
                    break;
                case 500:
                    message = "Internal server error. Please try again later.";
                    break;
                default:
                    message = error.response.data.message || message;
                    break;
            }
        }

        return message;
    };

    const doLogin = async (credentials) => {
        try {
            const response = await AuthService.postLogin(credentials);
            const accessToken = response.data.accessToken || null;

            if (accessToken) {
                const decoded = jwtDecode(accessToken);

                localStorage.setItem(
                    "accessToken",
                    JSON.stringify(accessToken)
                );

                localStorage.setItem("user", JSON.stringify(decoded.user));

                toast.info("Login successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                navigate("/home");
            }
        } catch (error) {
            console.log(error);
            toast.error(handleError(error), {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const doRegister = async (credentials) => {
        try {
            const response = await AuthService.postRegister(credentials);
            const data = response?.data;

            if (data) {
                setPurpose("login");
                toast.info("Registered successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    fontWeight: 600,
                });
            }
        } catch (error) {
            toast.error(handleError(error), {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <div className="flex w-full h-screen">
            {/*//* Image */}
            <div className="w-1/2 flex flex-center">
                <img
                    src="./image/login.png"
                    alt="Description"
                    className="max-w-[450px] w-full object-cover"
                />
            </div>

            {/*//* Form  */}
            <Formik
                initialValues={{
                    username: "minh",
                    password: "minh",
                    ...(purpose == "register" && {
                        email: "",
                        name: "",
                        phone: "",
                        address: "",
                    }),
                }}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                    console.log("Submit");
                    console.log(values);
                    if (purpose == "login") {
                        doLogin(values);
                    } else if (purpose == "register") {
                        doRegister(values);
                    }
                    setTimeout(() => {
                        actions.resetForm();
                        actions.setSubmitting(false);
                    }, 500);
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="flex flex-center flex-col flex-1 gap-[40px]">
                        <FormReset setPurpose={purpose} />
                        {/*//* Title */}
                        <h1 className="text-4xl font-semibold">{title}</h1>

                        {/*//* Input */}
                        <div className={`grid gap-[20px] ${gridCol}`}>
                            {fields?.map((field, index) => {
                                let inputType = "text";
                                if (field === "password") {
                                    inputType = "password";
                                } else if (field === "email") {
                                    inputType = "email";
                                }
                                return (
                                    <FormInput
                                        label={field}
                                        id={field}
                                        name={field}
                                        type={inputType}
                                        placeholder={`Enter your ${field}`}
                                        width="w-[340px]"
                                    ></FormInput>
                                );
                            })}
                        </div>

                        {/*//* Buttons */}
                        <div className="flex gap-[10px] justify-end">
                            <Button
                                name={
                                    purpose === "login" ? "Register" : "Login"
                                }
                                onClick={() =>
                                    setPurpose(
                                        purpose === "login"
                                            ? "register"
                                            : "login"
                                    )
                                }
                            />

                            <Button
                                name={
                                    purpose === "login" ? "Login" : "Register"
                                }
                                type="submit"
                                disabled={isSubmitting}
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default LoginPage;
