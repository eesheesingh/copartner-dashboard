import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import RAPage from "./components/RAPage/RAPage";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
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

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Sidebar />} errorElement={<ErrorPage />}>
        <Route path="" element={<Dashboard />} />
        <Route path="r.a" element={<RAPage />} />
        <Route path=":apName" element={<APPage />} />
        <Route path=":apName/:apId" element={<UserDetail />} />
        <Route path="r.a/:raName" element={<RAList />} />
        <Route path="blogs" element={<Blog />} />
        <Route path="radetails" element={<RADetail />} />
        <Route path="apdetails" element={<APDetail />} />
        <Route path="apdetails/:apName" element={<APList />} />
        <Route path="agencylist" element={<AgencyList />} />
        <Route path="agencylist/:agencyName" element={<AgencyID />} />
        <Route path="transaction" element={<Transaction />} />
        <Route path="transaction/:transactionId" element={<TransactionID />} />
        <Route path="marketingcontent" element={<MarketingContent />} />
        <Route path="userdata" element={<UserData />} />
        <Route path="relationship" element={<RelationManagement />} />
        <Route path="sub-admin" element={<SubAdmin />} />
        <Route path="sub-admin/access" element={<Access />} />
        <Route path="join" element={<Join />} />
      </Route>
    )
  );

  return (
    <div className="app-container">
      <main className="main-content">
        <RouterProvider router={router} />
      </main>
    </div>
  );
};

export default App;
