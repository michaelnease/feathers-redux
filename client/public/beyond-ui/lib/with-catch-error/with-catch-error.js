import "./with-catch-error.css";
import { apps } from "index/apps";
import { Link } from "react-router-dom";
import React, { Fragment, Component } from "react";

const withCatchError = MyComponent => {
  class MyComponentWrapper extends Component {
    constructor(props) {
      super(props);
      this.state = {
        hasError: false,
      };
    }

    componentDidCatch(error, info) {
      this.setState({ hasError: true });
    }

    render() {
      return (
        <Fragment>
          {this.state.hasError ? (
            <div className="l-catch-error" id="theme--night">
              <div className="catch-error__inner ui-card">
                <h2 className="ui-title title--t1">Oops ...</h2>
                <p>
                  Something went wrong while attempting to perform the action.
                  We are notified and we will try to fix the issue as soon as
                  possible.
                </p>
                <Link className="ui-button --primary" to={apps.projects.route}>
                  Go to Projects
                </Link>
              </div>
            </div>
          ) : (
            <MyComponent {...this.props} />
          )}
        </Fragment>
      );
    }
  }

  return MyComponentWrapper;
};

export { withCatchError };
