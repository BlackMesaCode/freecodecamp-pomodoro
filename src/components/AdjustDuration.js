import React from "react";
import TimeSpan from "timespan";

export default function AdjustDuration(props) {
    return (
        <div className="adjust-duration-container" classId={`adjust-${this.props.type}-container`}>
            <button onClick={this.props.adjustDuration.bind(this, props.duration + 1, props.type)}>+</button>
            <span>{props.type}</span>
            <button onClick={this.props.adjustDuration.bind(this, props.duration - 1, props.type)}>-</button>
        </div>
    );
}