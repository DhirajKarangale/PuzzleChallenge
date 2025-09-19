import { store } from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home';
import User from './pages/User/User';
import Rule from './pages/Rule/Rule';
import Maintenance from './pages/Maintenance/Maintenance';

import AutoLogin from './components/AutoLogin';
import LayoutNavbar from './components/LayoutNavbar';
import MessageBar from './components/MessageBar';
import Loader from './components/Loader';

import { routeAuth, routeHome, routeUser, routeRule, routeMaintenance } from './utils/Routes';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <AutoLogin />

        <Routes>
          <Route path={routeAuth} element={<Auth />} />
          <Route path={routeMaintenance} element={<Maintenance />} />

          <Route element={<LayoutNavbar />}>
            <Route path={routeHome} element={<Home />} />
            <Route path={routeRule} element={<Rule />} />
            <Route path={routeUser} element={<User />} />
          </Route>

        </Routes>
      </Router>

      <MessageBar />
      <Loader />
    </Provider>
  )
}

export default App;