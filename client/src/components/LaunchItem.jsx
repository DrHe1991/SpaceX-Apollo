import React from "react";
import classNames from "classnames";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import unknown_patch from "./unknown_patch.png";
import Countdown from "react-countdown-now";

function imgsrc(launch) {
    // console.log(launch.links.mission_patch_small)
    if (launch.links.mission_patch_small == null) {
        return unknown_patch;
    } else {
        return launch.links.mission_patch_small;
    }
}

export default function LaunchItem({
    launch,
    launch: {
        flight_number,
        mission_name,
        launch_date_local,
        launch_date_utc,
        launch_success
        // links:{mission_patch_small}
    }
}) {
    // console.log(launch)
    return (
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-2">
                    <img
                        src={imgsrc(launch)}
                        alt=""
                        style={{ width: 150, margin: "auto" }}
                    />
                </div>
                <div className="col-md-7">
                    <h4>Mission {flight_number}</h4>
                    <h4
                        className={classNames({
                            "text-success": launch_success,
                            "text-danger":
                                !launch_success &&
                                new Date(launch_date_utc).getTime() <=
                                    new Date().getTime(),
                            "text-warning":
                                !launch_success &&
                                new Date(launch_date_utc).getTime() >
                                    new Date().getTime()
                        })}
                    >
                        {mission_name}{" "}
                        {new Date(launch_date_utc).getTime() >
                        new Date().getTime() ? (
                            <Countdown date={launch_date_utc} />
                        ) : null}
                    </h4>
                    <p>
                        Date:{" "}
                        <Moment format="YYYY-MM-DD HH:mm">
                            {launch_date_local}
                        </Moment>
                    </p>
                </div>

                <div className="col-md-3">
                    <Link
                        to={`/launch/${flight_number}`}
                        className="btn btn-secondary"
                    >
                        Launch Details
                    </Link>
                </div>
            </div>
        </div>
    );
}
