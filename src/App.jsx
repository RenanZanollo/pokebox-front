import {Route, Routes, BrowserRouter} from "react-router";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import CollectionDetail from "./pages/CollectionDetail";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home/>}/>
            <Route path="/colecoes/:id" element={<CollectionDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
