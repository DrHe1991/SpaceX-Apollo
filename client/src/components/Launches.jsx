import React, { Component, Fragment } from "react";
import LaunchItem from "./LaunchItem";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import MissionKey from "./MissonKey";

const LAUNCHES_QUERY = gql`
    query MoreLaunchesQuery($cursor: Int) {
        launchFeed(cursor: $cursor) {
            cursor
            launches {
                flight_number
                mission_name
                launch_date_utc
                launch_date_local
                launch_success
                links {
                    mission_patch_small
                }
            }
        }
    }
`;


export class launch extends Component {
    // loadMore() {
    //     console.log("aaa");
    // }

    render() {
        return (
            <Fragment>
                <h1 className="display-4 my-3">Launches</h1>
                <MissionKey />
                <Query query={LAUNCHES_QUERY}>

                    {({ loading, error, data, fetchMore }) => {
                        if (loading) return <h4>Loading...</h4>;
                        if (error) console.log(error);
                        return (
                            <Fragment>
                                {data.launchFeed.launches.map(launch => (
                                    <LaunchItem
                                        key={launch.flight_number}
                                        launch={launch}
                                    />
                                ))}

                                <button
                                    onClick={() => {
                                        fetchMore({
                                            variables: {
                                                cursor: data.launchFeed.cursor
                                            },
                                            updateQuery: (
                                                previousResult,
                                                { fetchMoreResult }
                                            ) => {
                                                // console.log(fetchMoreResult.launchFeed)
                                                const newLaunches =
                                                    fetchMoreResult.launchFeed
                                                        .launches;
                                                const newCursor =
                                                    fetchMoreResult.launchFeed
                                                        .cursor;

                                                return {
                                                    launchFeed: {
                                                        cursor: newCursor,
                                                        launches: [
                                                            ...previousResult
                                                                .launchFeed
                                                                .launches,
                                                            ...newLaunches
                                                        ],
                                                        __typename:
                                                            previousResult.launchFeed.__typename
                                                    }
                                                };
                                            }
                                        });
                                    }}
                                    className="btn btn-secondary"
                                >
                                    Load More
                                </button>
                            </Fragment>
                        );
                    }}
                </Query>
            </Fragment>
        );
    }
}

export default launch;
