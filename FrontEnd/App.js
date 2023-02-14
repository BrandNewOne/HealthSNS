import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import UserInfo from './pages/UserInfo';
import Main from './pages/board/Main';
import InsertPosts from './pages/insertPosts/Main';
import UpdatePosts from './pages/updatePosts/Main';
import Manage from './pages/inputFood';
import Chart from './pages/chart/Chart';

// import Test from './trash/Test';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/userInfo" element={<UserInfo />} />
        <Route path="/main" element={<Main />} />
        <Route path="/iposts" element={<InsertPosts />} />
        <Route path="/uposts" element={<UpdatePosts />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/chart" element={<Chart />} />
        {/* <Route path="/testing" element={<Test />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;