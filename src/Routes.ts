import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ThienNguyen from "./pages/ThienNguyen";

export interface RouteData {
  exact?: boolean;
  component: React.ComponentType<any>;
  path: string;
  auth?: boolean;
}

export default class Routes {
  static login: RouteData = {
    exact: true,
    path: "/login",
    component: Login,
    auth: false,
  };
  static dashboard: RouteData = {
    exact: true,
    path: "/",
    component: Dashboard,
    auth: true,
  };
  static thiennguyen: RouteData = {
    exact: true,
    path: "/thiennguyen",
    component: ThienNguyen,
    auth: true,
  };
  static notFound: RouteData = {
    exact: false,
    path: "*",
    component: NotFound,
    auth: false,
  };
}

export const RouteList: RouteData[] = [
  Routes.login,
  Routes.dashboard,
  Routes.thiennguyen,
  Routes.notFound,
];
