import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { Container } from "reactstrap";
import Students from "./components/students/Students";
import { Routes, Route } from "react-router-dom";
import ClassRoom from "./pages/ClassRoom";
import Teachers from "./pages/Teachers";
import Subjects from "./pages/Subject";
import StdAllocation from "./pages/StdAllocation";

function App() {
  return (
    <Provider store={store}>
      <Container className="bg-light border" fluid="xxl">
        <Routes>
          <Route path="/" index element={<Students />} />
          <Route path="/classroom" element={<ClassRoom />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/stdallocation" element={<StdAllocation />} />
        </Routes>
      </Container>
      <ToastContainer />
    </Provider>
  );
}

export default App;
