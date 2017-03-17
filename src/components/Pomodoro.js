import React from "react";
import Countdown from "./Countdown.js";
import TimeSpan from "timespan";
import AdjustDuration from "./AdjustDuration.js";

export default class Pomodoro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeLeft: this.props.workingTime,
            paused: false,
            currentPhase: "Working",
            workingTime: this.props.workingTime,
            pauseTime: this.props.pauseTime
        }

        this.timer = setInterval(function() {
            if (this.state.timeLeft.totalSeconds() > 0) {
                if (!this.state.paused) {
                    this.setState((prevState, props) => {
                        let newTimeLeft = TimeSpan.clone(prevState.timeLeft)
                        newTimeLeft.subtractSeconds(1)
                        return {
                            timeLeft: newTimeLeft
                        };
                    });
                }
            }
            else {
                if (this.state.currentPhase === "Working") {
                    this.setState({
                        currentPhase: "Pause",
                        timeLeft: this.state.pauseTime // TODO antipattern, use callback
                    });
                }
                else {
                    this.setState({
                        currentPhase: "Working",
                        timeLeft: this.state.workingTime
                    });
                }
            }
        }.bind(this), 1000);
    }

    toggleCountdown() {
        this.setState({
            paused: !this.state.paused
        });
    }

    adjustDuration(operation, phase) {
        
        if (phase === "Working") {
            let newDuration = TimeSpan.clone(this.state.workingTime)
            if (operation === "increase") newDuration.addSeconds(1); else newDuration.subtractSeconds(1);

            this.setState({
                workingTime: newDuration,
            });
        }
        else {
            let newDuration = TimeSpan.clone(this.state.pauseTime)
            if (operation === "increase") newDuration.addSeconds(1); else newDuration.subtractSeconds(1);

            this.setState({
                pauseTime: newDuration,
            });
        }
    }

    render() {
        return (
            <div>
                <h1>Pomodoro Clock</h1>
                <Countdown timeLeft={this.state.timeLeft} paused={this.state.paused} toggleCountdown={this.toggleCountdown.bind(this)} 
                currentPhase={this.state.currentPhase}
                />
                <AdjustDuration type="Working" adjustDuration={this.adjustDuration.bind(this)} currentDuration={this.state.workingTime}/>
                <AdjustDuration type="Pause" adjustDuration={this.adjustDuration.bind(this)} currentDuration={this.state.pauseTime}/>
            </div>
        )
    }
}

Pomodoro.propTypes = {
    workingTime: React.PropTypes.object,
    pauseTime: React.PropTypes.object,
}

Pomodoro.defaultProps = {
    workingTime: TimeSpan.fromMinutes(25),
    pauseTime: TimeSpan.fromMinutes(5),
}