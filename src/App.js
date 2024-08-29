import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//import routes
import { publicRoutes } from "./routes/routes";

//import components
import DefaultLayout from "./layouts/DefaultLayout";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
