import React from "react";
import SignupOrIn from "../signinsplitscreens/SignupOrIn";
import Password from "../signinsplitscreens/Password";
import Otp from "../signinsplitscreens/otp";

const SignIn = () => {
  return (
    <div className="h-full md:min-h-screen flex items-center justify-center py-1 md:py-0 bg-[#FAFDFF]">
      <SignupOrIn />
    </div>
  );
};

export default SignIn;
