import React from "react";
import TimeSpan from "timespan";



export default function AdjustDuration(props) {
    return (
        <div className="adjust-duration-container" classID={`adjust-${props.type}-container`}>
            <span className="duration-type">{props.type}:</span>
            <button onClick={props.adjustDuration.bind(this, "decrease", props.type)}><i className="fa fa-minus-circle"></i></button>
            <span className="current-duration">{props.currentDuration.totalMinutes()}min</span>
            <button onClick={props.adjustDuration.bind(this, "increase", props.type)}><i className="fa fa-plus-circle"></i></button>
        </div>
    );
}

AdjustDuration.propTypes = {
    type: React.PropTypes.string.isRequired,
    currentDuration: React.PropTypes.object.isRequired,
    adjustDuration: React.PropTypes.func.isRequired
}