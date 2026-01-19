import React, { useState } from "react";
import LeftArrowIcon from "../../assets/icons/pricingpage/LeftArrowIcon";
import PersonalScreen from "../PricingPages/PersonalScreen";
import EnterpriseScreen from "../PricingPages/EnterpriseScreen";
import { Link } from "react-router-dom";
import Navbar from "../landingpages/Navbar";

const PricingPage = () => {
  const [active, setActive] = useState("personal");

  return (
    <div className="w-full relative">
      <Navbar/>
      <PersonalScreen />
      <EnterpriseScreen />
    </div>
  );
};

export default PricingPage;
