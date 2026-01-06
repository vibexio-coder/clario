import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/ocrscreens/LandingPage';
import AccountPage from './pages/ocrscreens/AccountPage';
import OriginalExtractPage from './pages/ocrscreens/OriginalExtractPage';
import UploadPage from './pages/ocrscreens/UploadPage';
import BusinessInquiry from './pages/loginscreens/BusinessInquiry';
import SignIn from './pages/loginscreens/SignIn';
import SignInBusiness from './pages/loginscreens/SignInBusiness';
import PricingPage from './pages/ocrscreens/PricingPage';
import EnterpriseScreen from './pages/PricingPages/EnterpriseScreen';
import PersonalScreen from './pages/PricingPages/PersonalScreen';
import LandingPopup from './pages/ocrpopups/LandingPopup';
import ExportSuccessfulPopup from './pages/ocrpopups/ExportSuccessfulPopup';
import ExtractingFilesPopup from './pages/ocrpopups/ExtractingFilesPopup';
import Signup from './pages/loginscreens/SignUp';
import ChooseAFormatPopup from './pages/ocrpopups/ChooseAFormatPopup';
import DemoSuccess from './pages/ocrpopups/DemoSuccess';
import InvoiceDoc from './pages/ocrpopups/InvoiceDoc';
import DemoLandingScreen from './pages/ocrscreens/DemoLandingScreen';
import DemoLogin from './pages/loginscreens/DemoLogin';
import Password from './pages/signinsplitscreens/Password';
import Otp from './pages/signinsplitscreens/otp';
import FullName from './pages/signinsplitscreens/FullName';
import CreatePassword from './pages/signinsplitscreens/CreatePassword';
import BusinessDetected from './pages/signinsplitscreens/BusinessDetected';
import BusinessUser from './pages/signinsplitscreens/BusinessUser';
import AllUsers from './pages/signinsplitscreens/AllUsers';
import Logout from './pages/ocrpopups/Logout';
import DeleteAccount from './pages/ocrpopups/DeleteAccount';
import Account from './pages/accountpages/Account';
import Security from './pages/accountpages/Security';
import Subscription from './pages/accountpages/Subscription';
import BillingInvoices from './pages/accountpages/BillingInvoices';
import NewPassword from './pages/signinsplitscreens/NewPassword';

const App = () => {
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
        <Route path="/exportsuccessfulpopup" element={<ExportSuccessfulPopup />} />
        <Route path="/extractingfilespopup" element={<ExtractingFilesPopup />} />
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
      </Routes>
    </div>
  );
}

export default App;
