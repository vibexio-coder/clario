import React, { useEffect, useState } from "react";
import EditIcon from "../../assets/icons/accountpage/EditIcon";
import Navbar from "../landingpages/Navbar";
import DeleteAccount from "../ocrpopups/DeleteAccount";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

const Account = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [error, setError] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const navigate = useNavigate();

    // Add states for edit mode
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingMobile, setIsEditingMobile] = useState(false);


    const getInputStyles = () => {
        const baseStyles =
            "max-[400px] md:max-w-[500px] w-full bg-[#F2F2F2] border rounded-[6px] px-4 py-3 font-avenir text-[16px] leading-[26px] outline-none focus:ring-1 pr-12 transition-colors duration-200";

        if (error) {
            return `${baseStyles} border-[#F1511B] placeholder:text-[#F1511B] text-[#F1511B] focus:ring-[#F1511B] bg-[#FFFFFF]`;
        }

        return `${baseStyles} border-[#21527D] placeholder:text-[#21527D]/50 text-[#21527D] focus:ring-[#21527D]`;
    };

    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
        if (error) setError("");
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (error) setError("");
    };

    const handleMobileChange = (e) => {
        setMobile(e.target.value);
        if (error) setError("");
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.target.value.trim()) {
            setError("This field is required");
        }
    };

    useEffect(() => {
        console.log("showDeleteModal changed:", showDeleteModal);

        if (showDeleteModal) {
            const scrollY = window.scrollY;

            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = "0";
            document.body.style.right = "0";
            document.body.style.width = "100%";
            document.body.style.overflow = "hidden";
        } else {
            const scrollY = document.body.style.top;

            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.left = "";
            document.body.style.right = "";
            document.body.style.width = "";
            document.body.style.overflow = "";

            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY) * -1);
            }
        }

        return () => {
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.left = "";
            document.body.style.right = "";
            document.body.style.width = "";
            document.body.style.overflow = "";
        };
    }, [showDeleteModal]);

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            console.warn("❌ userId missing, redirecting to signin");
            navigate("/signin");
            return;
        }

        api.get(`/auth/profile/${userId}`)
            .then(res => {
                setFullName(res.data.full_name ?? "None");
                setEmail(res.data.email ?? "None");
                setMobile(res.data.phone ?? "None");
            })
            .catch(() => {
                setError("Failed to load profile");
            });
    }, []);

    const handleUpdateName = async () => {
        const userId = localStorage.getItem("userId");

        if (!fullName.trim()) {
            setError("Full name is required");
            return;
        }

        await api.put(`/auth/profile/${userId}`, {
            fullName,
        });

        setIsEditingName(false);
    };


    const handleUpdateMobile = async () => {
        const userId = localStorage.getItem("userId");

        if (!mobile.trim()) {
            setError("Mobile number is required");
            return;
        }

        await api.put(`/auth/profile/${userId}`, {
            phone: mobile,
        });

        setIsEditingMobile(false);
    };


    const handleDeleteAccount = async () => {
        const userId = localStorage.getItem("userId");

        await api.delete(`/auth/profile/${userId}`);

        localStorage.clear();
        navigate("/signin");
    };

    const handleUpdateEmail = async () => {
        const userId = localStorage.getItem("userId");

        if (!email.trim()) {
            setError("Email is required");
            return;
        }

        await api.put(`/auth/profile/${userId}`, {
            email,
        });

        setEmail(email);
    };


    return (
        <div>
            <Navbar />
            <div className="w-full px-4 sm:px-6 lg:px-8 py-5 lg:py-10">
                {/* Title */}
                <h1 className="font-avenir font-normal text-2xl sm:text-3xl lg:text-[32px] leading-[26px] text-[#21527D] mb-6 md:mb-8">
                    Profile
                </h1>

                {/* Form Container */}
                <div className="space-y-6 md:space-y-8">
                    {/* Full Name Field */}
                    <div className="flex flex-col gap-2">
                        <label className="font-avenir font-normal text-base sm:text-[15px] lg:text-[16px] leading-[26px] text-[#000000]">
                            Full name
                        </label>

                        {isEditingName ? (
                            <div className="w-full max-w-[700px] flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={fullName === "None" ? "" : fullName}
                                        onChange={handleFullNameChange}
                                        className={getInputStyles()}
                                    />
                                </div>
                                <button onClick={handleUpdateName}
                                    className="cursor-pointer font-avenir font-bold text-base sm:text-[15px] lg:text-[16px] leading-[26px] text-[#FFFFFF] bg-[#21527D] w-full sm:w-auto sm:min-w-[160px] h-[40px] rounded-[10px]"
                                >
                                    Change Name
                                </button>
                            </div>
                        ) : (
                            <div className="relative w-full max-w-[500px]">
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={fullName}
                                    className={getInputStyles()}
                                    disabled
                                />
                                <button
                                    type="button"
                                    onClick={() => setIsEditingName(true)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-80 transition-opacity"
                                    aria-label="Edit full name"
                                >
                                    <EditIcon opacity={1} />
                                </button>
                            </div>
                        )}

                        {/* Error */}
                        {error && (
                            <p className="font-avenir text-xs sm:text-[12px] text-[#F1511B] italic mt-1">
                                {error}
                            </p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-col gap-2">
                        <label className="font-avenir font-normal text-base sm:text-[15px] lg:text-[16px] leading-[26px] text-[#000000]">
                            Email address
                        </label>

                        <div className="w-full max-w-[700px] flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                            <div className="relative w-full">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email === "None" ? "" : email}
                                    onChange={handleEmailChange}
                                    className={getInputStyles()}
                                />
                            </div>

                            <button
                                onClick={handleUpdateEmail}
                                className="cursor-pointer font-avenir font-bold text-base sm:text-[15px] lg:text-[16px] leading-[26px] text-[#FFFFFF] bg-[#21527D] w-full sm:w-auto sm:min-w-[160px] h-[40px] rounded-[10px]"
                            >
                                {email === "None" ? "Add email" : "Change email"}

                            </button>
                        </div>

                        <p className="font-avenir font-normal text-xs sm:text-[12px] leading-[18px] sm:leading-[20px] lg:leading-[26px] text-black/80 mt-1 max-w-[500px]">
                            To change your email, you'll need to verify the new address.
                        </p>

                        {/* Error */}
                        {error && (
                            <p className="font-avenir text-xs sm:text-[12px] text-[#F1511B] italic mt-1">
                                {error}
                            </p>
                        )}
                    </div>

                    {/* Mobile Number Field */}
                    <div className="flex flex-col gap-2">
                        <label className="font-avenir font-normal text-base sm:text-[15px] lg:text-[16px] leading-[26px] text-[#000000]">
                            Mobile number
                        </label>

                        {isEditingMobile ? (
                            <div className="w-full max-w-[700px] flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                                <div className="relative w-full">
                                    <input
                                        type="tel"
                                        placeholder="Enter mobile number"
                                        value={mobile === "None" ? "" : mobile}
                                        onChange={handleMobileChange}
                                        className={getInputStyles()}
                                    />
                                </div>
                                <button onClick={handleUpdateMobile}
                                    className="cursor-pointer font-avenir font-bold text-base sm:text-[15px] lg:text-[16px] leading-[26px] text-[#FFFFFF] bg-[#21527D] w-full sm:w-auto sm:min-w-[160px] h-[40px] rounded-[10px]"
                                >
                                    {mobile === "None" ? "Add number" : "Change number"}
                                </button>
                            </div>
                        ) : (
                            <div className="relative w-full max-w-[500px]">
                                <input
                                    type="tel"
                                    placeholder="Enter mobile number"
                                    value={mobile}
                                    className={getInputStyles()}
                                    disabled
                                />
                                <button
                                    type="button"
                                    onClick={() => setIsEditingMobile(true)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-80 transition-opacity"
                                    aria-label="Edit mobile number"
                                >
                                    <EditIcon opacity={1} />
                                </button>
                            </div>
                        )}

                        {/* Error */}
                        {error && (
                            <p className="font-avenir text-xs sm:text-[12px] text-[#F1511B] italic mt-1">
                                {error}
                            </p>
                        )}
                    </div>

                    {/* Delete Account Section */}
                    <div className="mt-10">
                        <h2 className="font-avenir font-normal text-xl sm:text-2xl lg:text-[32px] leading-[26px] text-[#21527D] mb-3">
                            Delete Account
                        </h2>

                        <div className="flex flex-col sm:flex-row sm:items-start md:items-center justify-between gap-4 sm:gap-6 max-w-[900px]">
                            <p className="font-avenir font-normal text-sm sm:text-[15px] lg:text-[16px] leading-[22px] sm:leading-[24px] lg:leading-[26px] text-black/80 flex-1">
                                This will permanently delete your account and all associated data. This action cannot be undone.
                            </p>

                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className="cursor-pointer font-avenir font-bold text-base sm:text-[15px] lg:text-[16px] leading-[26px] text-white bg-[#21527D] w-full sm:w-auto sm:min-w-[160px] h-[40px] rounded-[10px]"
                            >
                                Delete account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showDeleteModal && (
                <DeleteAccount onClose={() => setShowDeleteModal(false)} />
            )}
        </div>
    );
};

export default Account;