import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import routes from "./config";
import { Styles } from "../styles/styles";

// Function to dynamically import components based on the route component name
const lazyImport = (componentName: string) => {
  switch (componentName) {
    case 'Home':
      return lazy(() => import('../pages/Home'));
    // Add cases for other components as needed
    default:
      // Handle unknown components or provide a default component
      return lazy(() => import('../pages/Error'));
  }
};

const Router = () => {
  return (
    <Suspense fallback={null}>
      <Styles />
      <Header />
      <Switch>
        {routes.map((routeItem) => {
          const Component = lazyImport(routeItem.component);
          return (
            <Route
              key={routeItem.component}
              path={routeItem.path}
              exact={routeItem.exact}
              component={Component}
            />
          );
        })}
      </Switch>
      <Footer />
    </Suspense>
  );
};

export default Router;
