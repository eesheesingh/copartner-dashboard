
import './App.css'
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import RAPage from './components/RAPage/RAPage'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import ErrorPage from './components/ErrorPage/ErrorPage';
import UserDetail from './components/UserDetail/UserDetail';
import RAList from './components/RAList/RAList';
import Blog from './components/Blog/Blog';
import APPage from './components/APPage/APPage';
import RADetail from './components/RADetail/RADetail';
import APDetail from './components/APDetail/APDetail';
import APList from './components/APList/APList';
import AgencyList from './components/AgencyList/AgencyList';
import AgencyID from "./components/AgencyID/AgencyID";
import Transaction from './components/Transaction/Transaction';
import MarketingContent from './components/MarketingContent/MarketingContent';

const App = () => {
 
  const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path= "/" element= {  <Sidebar />  } errorElement={<ErrorPage />}>
      <Route path='' element= {  <Dashboard /> } />
      <Route path='r.a' element= {  <RAPage /> } />
      <Route path='a.p' element= {  <APPage /> } />   {/*dynamic routing in a.p */}
      <Route path='user-number' element= {  <UserDetail /> } />   {/*dynamic routing for number in a.p */}
      <Route path='ra-name' element= {  <RAList /> } />
      <Route path='blogs' element= {  <Blog /> } />
      <Route path='radetails' element= {  <RADetail /> } />
      <Route path='apdetails' element= {  <APDetail /> } />
      <Route path='ap-name' element= {  <APList /> } />
      <Route path='agencylist' element= {  <AgencyList /> } />
      <Route path='agency' element= {  <AgencyID /> } /> {/*dynamic routing for agency*/}
      <Route path='transaction/ra' element= {  <Transaction /> } />
      <Route path='marketingcontent/banner' element= {  <MarketingContent /> } />
      {/* <Route path='userdata' element= {  <Transaction /> } /> */}
    </Route>
    </>
  ))

  return (
    <div className="app-container">
      <main className="main-content">
        <RouterProvider router={router} />
      </main>    
    </div>
  );
}

export default App
