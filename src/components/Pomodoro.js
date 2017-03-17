import React from "react";
import Countdown from "./Countdown.js";  // https://www.npmjs.com/package/timespan
import TimeSpan from "timespan";
import AdjustDuration from "./AdjustDuration.js";


export default class Pomodoro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeLeft: this.props.workingTime,
            paused: true,
            currentPhase: "Working",
            workingTime: this.props.workingTime,
            pauseTime: this.props.pauseTime
        };
        this.startTimer();
    }

    reset() {
        this.setState({
            timeLeft: this.state.workingTime,
            paused: true,
            currentPhase: "Working",
        });
    }

    startTimer() {
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
        let durationCopy = phase === "Working" ? TimeSpan.clone(this.state.workingTime) : TimeSpan.clone(this.state.pauseTime)

        if (operation === "increase" && durationCopy.totalMinutes() < 59) {
            durationCopy.addMinutes(1);
        }
        else if (operation === "decrease" && durationCopy.totalMinutes() > 1) {
            durationCopy.subtractMinutes(1);
        }

        if (phase === "Working") {
            this.setState({ workingTime: durationCopy });
            if (this.state.paused) {
                this.setState({ timeLeft: durationCopy });
            }
        }
        else {
            this.setState({ pauseTime: durationCopy });
        }
    }

    render() {
        return (
            <div id="pomodoro">
                <p>Pomodoro Clock</p>
                <Countdown timeLeft={this.state.timeLeft} paused={this.state.paused} toggleCountdown={this.toggleCountdown.bind(this)} 
                currentPhase={this.state.currentPhase} reset={this.reset.bind(this)} />
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