const axios = require("axios");
module.exports = {
    Query: {
        launchFeed: async (parent, { cursor }) => {
            const launches = await axios
                .get("https://api.spacexdata.com/v3/launches")
                .then(res => {

                    for (var i = 0; i < res.data.length; i++) {
                        if (
                            new Date(res.data[i].launch_date_utc).getTime() >
                            new Date().getTime()
                        ) {
                            break;
                        }
                    }
                    return res.data.slice(0, i + 2);
                })
                .catch(err => err);
            // console.log(launches[0].launch_date_unix)
            if (!cursor) {
                cursor = launches[launches.length - 1].launch_date_unix;
            }
            //   cursor = cursor.toString()
            //   cursor = parseInt(cursor);
            // limit is the number of messages we will return.
            // We could pass it in as an argument but in this
            // case let's use a static value.
            const limit = 10;

            const newestLaunchIndex = launches.findIndex(
                launch => launch.launch_date_unix === cursor
            ); // find index of message created at time held in cursor
            // console.log(newestLaunchIndex)
            const newCursor =
                launches[newestLaunchIndex - limit].launch_date_unix;
            //   console.log(newCursor)
            const launchFeed = {
                launches: launches
                    .slice(newestLaunchIndex - limit, newestLaunchIndex)
                    .reverse(),
                cursor: newCursor
            };
            return launchFeed;
        },

        launches: () => {
            return axios
                .get(`https://api.spacexdata.com/v3/launches`)
                .then(res => res.data)
                .catch(err => err);
        },
        launch: (parent, { flight_number }) => {
            return axios
                .get(`https://api.spacexdata.com/v3/launches/${flight_number}`)
                .then(res => res.data)
                .catch(err => err);
        },
        rockets: () => {
            return axios
                .get("https://api.spacexdata.com/v3/rockets")
                .then(res => res.data)
                .catch(err => err);
        },
        rocket: (parent, { id }) => {
            return axios
                .get(`https://api.spacexdata.com/v3/rockets/${id}`)
                .then(res => res.data)
                .catch(err => err);
        }
    },
    Rocket: {
        rocket_id: parent => {
            return parent.rocket_id;
        }
    }
};
