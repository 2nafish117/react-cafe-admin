/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
// import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import FastfoodIcon from '@material-ui/icons/Fastfood';
import KitchenIcon from '@material-ui/icons/Kitchen';
import PaymentIcon from '@material-ui/icons/Payment';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
// import LibraryBooks from "@material-ui/icons/LibraryBooks";
// import BubbleChart from "@material-ui/icons/BubbleChart";
// import LocationOn from "@material-ui/icons/LocationOn";
// import Notifications from "@material-ui/icons/Notifications";
// import Unarchive from "@material-ui/icons/Unarchive";
// import Language from "@material-ui/icons/Language";
// // core components/views for Admin layout
import EmployeeManagement from "views/EmployeeManagement/EmployeeManagement.js";
import MealManagement from "views/MealManagement/MealManagement.js";
import CatererManagement from "views/CatererManagement/CatererManagement.js";
import AdminTransactions from "views/AdminTransactions/AdminTransactions.js";
import ManagerTransactions from "views/ManagerTransactions/ManagerTransactions.js";
import Reports from "views/Reports/Reports";
import AdminManagement from "views/AdminManagement/AdminManagement";
// import DashboardPage from "views/Dashboard/Dashboard.js";
// import UserProfile from "views/UserProfile/UserProfile.js";
// import Yeet from "views/Yeet/Yeet.js";
// import TableList from "views/TableList/TableList.js";
// import Typography from "views/Typography/Typography.js";
// import Icons from "views/Icons/Icons.js";
// import Maps from "views/Maps/Maps.js";
// import NotificationsPage from "views/Notifications/Notifications.js";
// import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// // core components/views for RTL layout
// import RTLPage from "views/RTLPage/RTLPage.js";

const adminRoutes = [
  {
    path: "/employees",
    name: "Employees",
    icon: Person,
    component: EmployeeManagement,
    layout: "/admin"
  },
  {
    path: "/meals",
    name: "Meals",
    icon: FastfoodIcon,
    component: MealManagement,
    layout: "/admin"
  },
  {
    path: "/caterers",
    name: "Caterers",
    icon: KitchenIcon,
    component: CatererManagement,
    layout: "/admin"
  },
  {
    path: "/transactions",
    name: "Transactions",
    icon: PaymentIcon,
    component: AdminTransactions,
    layout: "/admin"
  },
  {
    path: "/reports",
    name: "Reports",
    icon: AssessmentIcon,
    component: Reports,
    layout: "/admin"
  },
];

const managerRoutes = [
  {
    path: "/admins",
    name: "Admins",
    icon: SupervisorAccountIcon,
    component: AdminManagement,
    layout: "/manager"
  },
  {
    path: "/transactions",
    name: "Transactions",
    icon: PaymentIcon,
    component: ManagerTransactions,
    layout: "/manager"
  },
  {
    path: "/reports",
    name: "Reports",
    icon: AssessmentIcon,
    component: Reports,
    layout: "/manager"
  },
];

// const dashboardRoutes = [
//   {
//     path: "/dashboard",
//     name: "Dashboard",
//     rtlName: "لوحة القيادة",
//     icon: Dashboard,
//     component: DashboardPage,
//     layout: "/admin"
//   },
//   {
//     path: "/user",
//     name: "User Profile",
//     rtlName: "ملف تعريفي للمستخدم",
//     icon: Person,
//     component: UserProfile,
//     layout: "/admin"
//   },
//   {
//     path: "/table",
//     name: "Table List",
//     rtlName: "قائمة الجدول",
//     icon: "content_paste",
//     component: TableList,
//     layout: "/admin"
//   },
//   {
//     path: "/typography",
//     name: "Typography",
//     rtlName: "طباعة",
//     icon: LibraryBooks,
//     component: Typography,
//     layout: "/admin"
//   },
//   {
//     path: "/icons",
//     name: "Icons",
//     rtlName: "الرموز",
//     icon: BubbleChart,
//     component: Icons,
//     layout: "/admin"
//   },
//   {
//     path: "/maps",
//     name: "Maps",
//     rtlName: "خرائط",
//     icon: LocationOn,
//     component: Maps,
//     layout: "/admin"
//   },
//   {
//     path: "/notifications",
//     name: "Notifications",
//     rtlName: "إخطارات",
//     icon: Notifications,
//     component: NotificationsPage,
//     layout: "/admin"
//   },
//   // {
//   //   path: "/rtl-page",
//   //   name: "RTL Support",
//   //   rtlName: "پشتیبانی از راست به چپ",
//   //   icon: Language,
//   //   component: RTLPage,
//   //   layout: "/rtl"
//   // },
//   {
//     path: "/yeet",
//     name: "yeet",
//     icon: Language,
//     component: Yeet,
//     layout: "/admin"
//   },
//   {
//     path: "/upgrade-to-pro",
//     name: "Upgrade To PRO",
//     rtlName: "التطور للاحترافية",
//     icon: Unarchive,
//     component: UpgradeToPro,
//     layout: "/admin"
//   }
// ];

// export default dashboardRoutes;
export { adminRoutes, managerRoutes };
