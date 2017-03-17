import React from "react";
import TimeSpan from "timespan";

export default function AdjustDuration(props) {
    return (
        <div className="adjust-duration-container" classID={`adjust-${props.type}-container`}>
            <button onClick={props.adjustDuration.bind(this, "increase", props.type)}>+</button>
            <span>{props.type}</span>{props.currentDuration.totalSeconds()}
            <button onClick={props.adjustDuration.bind(this, "drecrease", props.type)}>-</button>
        </div>
    );
}