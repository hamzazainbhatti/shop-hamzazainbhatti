import { createBrowserRouter } from "react-router";
import AboutPage from "./pages/AboutPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import MenPage from "./pages/MenPage.jsx";
import NewArrivalsPage from "./pages/NewArrivalsPage.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import ShirtsPage from "./pages/ShirtsPage.jsx";
import WomenPage from "./pages/WomenPage.jsx";
import App from "./App.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: HomePage },
      { path: "new-arrivals", Component: NewArrivalsPage },
      { path: "men", Component: MenPage },
      { path: "women", Component: WomenPage },
      { path: "shirts", Component: ShirtsPage },
      { path: "about", Component: AboutPage },
    ],
  },
  { path: "*", Component: PageNotFound },
]);

export default router;
