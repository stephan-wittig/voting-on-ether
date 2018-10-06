import React from "react";
import { DrizzleContext } from "drizzle-react";

const LoadingContainer = ({LoadingComp, children}) => {
  return (
    <DrizzleContext.Consumer>
      {drizzleContext => {

        if (!drizzleContext.initialized) {
          return (<LoadingComp/>);
        }

        return children
      }}
    </DrizzleContext.Consumer>
  );
}

export default LoadingContainer;
