import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";

const withLoading = (Component) => {
  return (props) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }, [props]);

    return loading ? <Spinner /> : <Component {...props} />;
  };
};

export default withLoading;
