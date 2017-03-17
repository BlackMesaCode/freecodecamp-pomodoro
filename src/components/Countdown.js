import React from "react";
import TimeSpan from "timespan";


export default function Countdown(props) {
    return (
        <div id="countdown">
            <h1 id="current-phase">{props.currentPhase}-Time</h1>
            <div id="timeleft">{props.timeLeft.minutes}:{props.timeLeft.seconds}</div>
            <button onClick={props.toggleCountdown}>
                { props.paused ? <i className="fa fa-play-circle-o"></i> : <i className="fa fa-pause-circle-o"></i> }
            </button>
            <button onClick={props.reset}>
                <i className="fa fa-refresh"></i>
            </button>
        </div>
    );
}