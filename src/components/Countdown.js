import React from "react";
import TimeSpan from "timespan";

export default function Countdown(props) {
    return (
        <div classID="countdown">
            <p>{props.currentPhase}-Time</p>
            <div classID="timeleft">{props.timeLeft.minutes}:{props.timeLeft.seconds}</div>
            <button classID="countdown-toggle" onClick={props.toggleCountdown}>
                { props.paused ? <i className="fa fa-play-circle-o"></i> : <i className="fa fa-pause-circle-o"></i> }
            </button>
        </div>
    );
}