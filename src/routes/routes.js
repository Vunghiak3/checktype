import config from "~/config";

// import components page
import Home from "~/pages/Home";
import Setting from "~/pages/Setting";
import About from "~/pages/About";

const publicRoutes = [
    {path: config.routes.home, component: Home},
    {path: config.routes.setting, component: Setting},
    {path: config.routes.about, component: About},
];

const privateRoutes = [];

export {publicRoutes, privateRoutes}