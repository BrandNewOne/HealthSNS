import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SignUp from './component/SignUp';
import SignIn from './component/SignIn';
import UserInfo from './component/UserInfo';
import Main from './component/Main';
import LikeItMain from './component/LikeItMain';
import InsertPosts from './component/InsertPosts';
import UpdatePosts from './component/UpdatePosts';
import Manage from './component/Manage';
import Chart from './component/Chart';

// import Test from './component/Test';

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
        <Route path="/likeItMain" element={<LikeItMain />} />

        {/* <Route path="/testing" element={<Test />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;