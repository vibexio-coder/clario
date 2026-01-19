import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./pages/ocrscreens/LandingPage";
import AccountPage from "./pages/ocrscreens/AccountPage";
import OriginalExtractPage from "./pages/ocrscreens/OriginalExtractPage";
import UploadPage from "./pages/ocrscreens/UploadPage";
import BusinessInquiry from "./pages/loginscreens/BusinessInquiry";
import SignIn from "./pages/loginscreens/SignIn";
import SignInBusiness from "./pages/loginscreens/SignInBusiness";
import PricingPage from "./pages/ocrscreens/PricingPage";
import EnterpriseScreen from "./pages/PricingPages/EnterpriseScreen";
import PersonalScreen from "./pages/PricingPages/PersonalScreen";
import LandingPopup from "./pages/ocrpopups/LandingPopup";
import ExportSuccessfulPopup from "./pages/ocrpopups/ExportSuccessfulPopup";
import ExtractingFilesPopup from "./pages/ocrpopups/ExtractingFilesPopup";
import Signup from "./pages/loginscreens/SignUp";
import ChooseAFormatPopup from "./pages/ocrpopups/ChooseAFormatPopup";
import DemoSuccess from "./pages/ocrpopups/DemoSuccess";
import InvoiceDoc from "./pages/ocrpopups/InvoiceDoc";
import DemoLandingScreen from "./pages/ocrscreens/DemoLandingScreen";
import DemoLogin from "./pages/loginscreens/DemoLogin";
import Password from "./pages/signinsplitscreens/Password";
import Otp from "./pages/signinsplitscreens/otp";
import FullName from "./pages/signinsplitscreens/FullName";
import CreatePassword from "./pages/signinsplitscreens/CreatePassword";
import BusinessDetected from "./pages/signinsplitscreens/BusinessDetected";
import BusinessUser from "./pages/signinsplitscreens/BusinessUser";
import AllUsers from "./pages/signinsplitscreens/AllUsers";
import Logout from "./pages/ocrpopups/Logout";
import DeleteAccount from "./pages/ocrpopups/DeleteAccount";
import Account from "./pages/accountpages/Account";
import Security from "./pages/accountpages/Security";
import Subscription from "./pages/accountpages/Subscription";
import BillingInvoices from "./pages/accountpages/BillingInvoices";
import NewPassword from "./pages/signinsplitscreens/NewPassword";
import FileTesting from "./pages/demolandingpages/FileTesting.Jsx";
import OcrEngine from "./pages/navigationpages/OcrEngine";
import HandwrittenText from "./pages/navigationpages/HandwrittenText";
import InvoiceToExcel from "./pages/navigationpages/InvoiceToExcel";
import ApiIntegration from "./pages/navigationpages/ApiIntegration";
import Pricing from "./pages/navigationpages/Pricing";
import Logistic from "./pages/navigationpages/Logistic";
import Finance from "./pages/navigationpages/Finance";
import Healthcare from "./pages/navigationpages/Healthcare";
import Government from "./pages/navigationpages/Government";
import Customai from "./pages/navigationpages/Customai";
import PrivacyPolicy from "./pages/navigationpages/PrivacyPolicy";
import TermsService from "./pages/navigationpages/TermsService";
import SecurityCompliance from "./pages/navigationpages/SecurityCompliance";
import SlaSupport from "./pages/navigationpages/SlaSupport";
import CustomDeployment from "./pages/navigationpages/CustomDeployment";
import ContactSales from "./pages/navigationpages/ContactSales";
import Api from "./pages/navigationpages/Api";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <div>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/demologin" element={<DemoLogin />} />
        <Route path="/" element={<DemoLandingScreen />} />
        <Route path="/accountpage" element={<AccountPage />} />
        <Route path="/enterprisescreen" element={<EnterpriseScreen />} />
        <Route path="/originalextractPage" element={<OriginalExtractPage />} />
        <Route path="/personalscreen" element={<PersonalScreen />} />
        <Route path="/uploadpage" element={<UploadPage />} />
        <Route path="/pricingpage" element={<PricingPage />} />
        <Route path="/landinpopup" element={<LandingPopup />} />
        <Route
          path="/exportsuccessfulpopup"
          element={<ExportSuccessfulPopup />}
        />
        <Route
          path="/extractingfilespopup"
          element={<ExtractingFilesPopup />}
        />
        <Route path="/chooseaformatpopup" element={<ChooseAFormatPopup />} />
        <Route path="/demosuccess" element={<DemoSuccess />} />
        <Route path="/invoicedoc" element={<InvoiceDoc />} />
        <Route path="/password" element={<Password />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/newpassword" element={<NewPassword />} />
        <Route path="/fullname" element={<FullName />} />
        <Route path="/createpassword" element={<CreatePassword />} />
        <Route path="/businessdetected" element={<BusinessDetected />} />
        <Route path="/businessuser" element={<BusinessUser />} />
        <Route path="/allusers" element={<AllUsers />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/deleteaccount" element={<DeleteAccount />} />
        <Route path="/account" element={<Account />} />
        <Route path="/security" element={<Security />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/billinginvoices" element={<BillingInvoices />} />
        <Route path="/filetesting" element={<FileTesting />} />
        <Route path="/ocrengine" element={<OcrEngine />} />
        <Route path="/handwrittentext" element={<HandwrittenText />} />
        <Route path="/invoicetoexcel" element={<InvoiceToExcel />} />
        <Route path="/apiintegration" element={<ApiIntegration />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/Logistics" element={<Logistic />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/healthcare" element={<Healthcare />} />
        <Route path="/government" element={<Government />} />
        <Route path="/customai" element={<Customai />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/termsservice" element={<TermsService />} />
        <Route path="/securitycompliance" element={<SecurityCompliance />} />
        <Route path="/slasupport" element={<SlaSupport />} />
        <Route path="/customdeployment" element={<CustomDeployment />} />
        <Route path="/contactsales" element={<ContactSales />} />
        <Route path="/Api" element={<Api />} />
      </Routes>
    </div>
  );
};

export default App;
