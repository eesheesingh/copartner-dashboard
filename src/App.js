import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import RAPage from "./components/RAPage/RAPage";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import UserDetail from "./components/UserDetail/UserDetail";
import RAList from "./components/RAList/RAList";
import Blog from "./components/Blog/Blog";
import APPage from "./components/APPage/APPage";
import RADetail from "./components/RADetail/RADetail";
import APDetail from "./components/APDetail/APDetail";
import APList from "./components/APList/APList";
import AgencyList from "./components/AgencyList/AgencyList";
import AgencyID from "./components/AgencyID/AgencyID";
import Transaction from "./components/Transaction/Transaction";
import MarketingContent from "./components/MarketingContent/MarketingContent";
import UserData from "./components/UserData/UserData";
import RelationManagement from "./components/Relationship/RelationManagement";
import SubAdmin from "./components/SubAdmin/SubAdmin";
import Join from "./components/Join/Join";
import Access from "./components/SubAdmin/Access";
import TransactionID from "./components/Transaction/TransactionID";
import Login from "./components/LoginCredentials/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RAUserData from "./components/RAUserData/RAUserData";
import Signup from "./components/Signup/Signup";
import ChatIds from "./components/ChatIds/ChatIds";
import Notification from "./components/Notification/Notification";
import TelegramPage from "./components/TelegramPage/TelegramPage";
import CPDiscount from "./components/CPDiscount/CPDiscount";
import ApCpTotal from "./components/ApCpTotal/APCpTotal";
import MinorSubscription from "./components/UserData/MinorSubscription";
import MinorSub from "./components/MinorSub/MinorSub";

const App = () => {
  const token = sessionStorage.getItem("creds");
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={token ? <Sidebar /> : <Navigate to="/signup" />} errorElement={<ErrorPage />}>
          <Route path="" element={<Dashboard />} />
          <Route path="r.a" element={<RAPage />} />
          <Route path=":apName" element={<APPage />} />
          <Route path=":apName/:apId" element={<UserDetail />} />
          <Route path="r.a/:raId" element={<RAList />} />
          <Route path="blogs" element={<Blog />} />
          <Route path="radetails" element={<RADetail />} />
          <Route path="MinorSub" element={<MinorSub />} />
          <Route path="apdetails" element={<APDetail />} />
          <Route path="apdetails/:apName" element={<APList />} />
          <Route path="agencylist" element={<AgencyList />} />
          <Route path="agencylist/:agencyId" element={<AgencyID />} />
          <Route path="transaction" element={<Transaction />} />
          <Route path="transaction/:transactionId" element={<TransactionID />} />
          <Route path="marketingcontent" element={<MarketingContent />} />
          <Route path="userdata" element={<UserData />} />
          <Route path="relationship" element={<RelationManagement />} />
          <Route path="sub-admin" element={<SubAdmin />} />
          <Route path="sub-admin/access" element={<Access />} />
          <Route path="join" element={<Join />} />
          <Route path="login" element={<Login />} />
          <Route path="rauserdata" element={<RAUserData />} />
          <Route path="chatids" element={<ChatIds />} />
          <Route path="notification" element={<Notification />} />
          <Route path="telegrampage" element={<TelegramPage />} />
          <Route path="CPDiscount" element={<CPDiscount />} />
          <Route path="ApCpTotal" element={<ApCpTotal />} />
        </Route>
        <Route path="signup" element={<Signup />} />
      </>
    )
  );

  return (
    <div className="app-container">
      <main className="main-content">
        <RouterProvider router={router} />
      </main>
      <ToastContainer />
    </div>
  );
};

export default App;
