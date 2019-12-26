import React from "react";
import ProfilePresenter from "./ProfilePresenter";
import { useQuery, useMutation } from "react-apollo-hooks";
import { GET_USER, LOG_OUT } from "./ProfileQueries";
import { withRouter } from "react-router-dom";

export default withRouter(({
    match: { params : {userName}}
}) => {
    const {data, loading} = useQuery(GET_USER, {
        variables: {userName}
    });
    const [logUserOut] = useMutation(LOG_OUT);
    return <ProfilePresenter loading={loading} logOut={logUserOut} data={data} />
});