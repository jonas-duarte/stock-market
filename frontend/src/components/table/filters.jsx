import React from "react";

const Filters = props => {
    const { columns } = props;
    return <div>{JSON.stringify(columns)}</div>;
};

export default Filters;
