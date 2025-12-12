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

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/businessinquiry" element={<BusinessInquiry />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signinbusiness" element={<SignInBusiness />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/accountpage" element={<AccountPage />} />
        <Route path="/enterprisescreen" element={<EnterpriseScreen />} />
        <Route path="/originalextractPage" element={<OriginalExtractPage />} />
        <Route path="/personalscreen" element={<PersonalScreen />} />
        <Route path="/uploadpage" element={<UploadPage />} />
        <Route path="/pricingpage" element={<PricingPage />} />
        <Route path="/landinpopup" element={<LandingPopup />} />
        <Route path="/ExportSuccessfulPopup" element={<ExportSuccessfulPopup />} />
        <Route path="/ExtractingFilesPopup" element={<ExtractingFilesPopup />} />
        <Route path="/ChooseAFormatPopup" element={<ChooseAFormatPopup />} />
      </Routes>
    </div>
  );
}

export default App;
