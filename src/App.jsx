import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResponsiveDrawer from "./components/Nav/ResponsiveDrawer";
import Home from "./components/Home";
import Create from "./components/Create";
import Post from "./components/Post";
import Feature from "./components/Feature";

function App() {
  const [, forceRender] = React.useState();

  React.useEffect(() => {
    // Llama a la función forceRender para forzar una renderización cuando sea necesario
    forceRender({});
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<ResponsiveDrawer />}>
            <Route path="/home" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/post" element={<Post />} />
            <Route path="/feature" element={<Feature />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
