import { HomePage } from "./Components/HomePage";
import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";
import { Status } from "./Components/Status/Status";
import { StatusView } from "./Components/Status/StatusView";
import { SignIn } from "./Components/User/SignIn";
import { SignUp } from "./Components/User/SignUp";
import { Profile } from "./Components/Profile/Profile";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/status" element={<Status/>}></Route>
        <Route path="/status/:userId" element={<StatusView/>}></Route>
        <Route path="/signin" element={<SignIn/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
