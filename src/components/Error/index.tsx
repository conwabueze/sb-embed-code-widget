import React from "react";
import CSS from "csstype";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const Error = () => {
  
  const errorMessageStyle: CSS.Properties = {
    padding: "5px 0px",
  };

  return <h2 className="cwTwitterFeedErrorMessage" style={errorMessageStyle}>Could not load Twitter feed.<br/>Please check your settings or contact the developer of the widget.</h2>;
};
