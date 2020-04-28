import React from "react";
import { Link } from "react-router-dom";

function Breadcrumb(props) {
  const routes = props.activePath.split("/").splice(1);

  const getUrl = route => {
    let indexOfRoute = routes.indexOf(route);
    let url = routes.slice(0, indexOfRoute + 1).reduce((acc, route) => {
      return (acc += "/" + route);
    }, "");
    return url;
  };

  const formatRoute = route => {
    let blacklist = ["css", "js", "html"];
    let formattedRoute = route.split("-").reduce((acc, wordInRoute) => {
      if (blacklist.includes(wordInRoute)) {
        return (acc += wordInRoute.toUpperCase() + " ");
      } else {
        return (acc +=
          wordInRoute.charAt(0).toUpperCase() +
          wordInRoute.slice(1).toLowerCase() +
          " ");
      }
    }, "");
    return formattedRoute;
  };

  return (
    <div className="l-flex-row">
      {routes.map((route, i) => {
        return (
          <div key={i} className="l-flex-row breadcrumb">
            <Link
              to={getUrl(route)}
              className={i < routes.length - 1 ? null : "active-node"}
            >
              {formatRoute(route)}
            </Link>
            {i < routes.length - 1 ? (
              <p>
                &nbsp;&nbsp;
                <i className="fe fe-chevron-right" />
                &nbsp;&nbsp;
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default Breadcrumb;
