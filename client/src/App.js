import { HomePage } from "./Components/HomePage";
import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";
import { Status } from "./Components/Status/Status";
import { StatusView } from "./Components/Status/StatusView";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/status" element={<Status/>}></Route>
        <Route path="/status/:userId" element={<StatusView/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
