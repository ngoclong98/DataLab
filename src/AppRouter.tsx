import { Switch, Route, Redirect } from "react-router-dom";
import useTokenInfo from "./hooks/UseTokenInfo";
import { RouteList } from "./Routes";

const AuthRoute = ({ children, ...rest }) => {
  const tokenInfo = useTokenInfo();
  console.log("tokenInfo", tokenInfo);
  return (
    <Route
      render={({ location }) =>
        tokenInfo ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const AppRouter = () => {
  return (
    <Switch>
      {RouteList.map((route) => {
        if (route.auth) {
          return (
            <AuthRoute
              exact={route?.exact || false}
              path={route.path}
              key={route.path}
            >
              <route.component />
            </AuthRoute>
          );
        } else {
          return (
            <Route
              path={route.path}
              key={route.path}
              exact={route?.exact || false}
            >
              <route.component />
            </Route>
          );
        }
      })}
    </Switch>
  );
};

export default AppRouter;
