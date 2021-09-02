import React from "react";
import Loader from "react-loader-spinner";

function WithLoading(WrappedComponent) {
  return function ({ isLoading, ...props }) {
    if (!isLoading) return <WrappedComponent {...props} />;
    return (
      <div className="loading-spinner">
        <Loader type="Oval" color="#fff" height={100} width={100} />
      </div>
    );
  };
}

export default WithLoading;
