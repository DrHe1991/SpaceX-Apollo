const { gql } = require("apollo-server-express");
module.exports = gql`
type LaunchFeed {
    cursor: Int
    launches: [Launch]!
}
type Launch {
    flight_number: String!
    mission_name: String!
    launch_year: String!
    launch_date_local: String!
    launch_date_utc:String!
    launch_success: Boolean
    links: Links
    rocket: Rocket!

}
type Links {
    mission_patch_small: String
}
type Rocket {
    rocket_id: String!
    rocket_name: String!
    rocket_type: String!
}
type Query {
    launchFeed(cursor:Int): LaunchFeed
    launches:[Launch!]
    launch(flight_number:Int!): Launch!
    rockets: [Rocket!]
    rocket(id:String!): Rocket!
}
`