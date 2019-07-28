import React from "react";

const Sort = props => {
    const { columns } = props;
    return <div>{JSON.stringify(columns)}</div>;
};

export default Sort;
