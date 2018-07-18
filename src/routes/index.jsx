import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import Login from "views/Login/Login.jsx";


const indexRoutes = [
  { path: process.env.PUBLIC_URL ?  process.env.PUBLIC_URL + "/login" : "/login", component: Login },
  { path: process.env.PUBLIC_URL || "/", component: Dashboard }
];

export default indexRoutes;
