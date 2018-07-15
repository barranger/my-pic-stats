// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";

const prefix = process.env.PUBLIC_URL;

const dashboardRoutes = [
  {
    path: prefix + "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "My Pic Stats",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: prefix + "/user",
    sidebarName: "Profile",
    navbarName: "Profile",
    icon: Person,
    component: UserProfile
  },
  { redirect: true, path: "/", to: prefix + "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
