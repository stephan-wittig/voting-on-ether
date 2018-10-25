import React from "react";
import { DrizzleContext } from "drizzle-react";

// Loading Container: Kann in einem DrizzleContext.Provider verwendet werden, um eine Fehlermeldung anzuzeigen, wenn keine Verbindung zur Blockchain hergestellt werden konnte. Beugt so Fehlern in Drizzled Components vor
// Nimmt eine LoadingComp als props. Das sollte eine Komponente sein, die angezeigt wird, wenn keine Verbindung zur Blockchain hergestellt werden kann. Ansonsten werden die children gerendert.
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
