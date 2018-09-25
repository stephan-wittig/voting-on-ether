import React from "react";
import { DrizzleContext } from "drizzle-react";

const LoadingContainer = (props) => {
  return (
    <DrizzleContext.Consumer>
      {drizzleContext => {

        if (!drizzleContext.initialized) {
          return "Loading...";
        }

        return props.children
      }}
    </DrizzleContext.Consumer>
  );
}

export default LoadingContainer;
