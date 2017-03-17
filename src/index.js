import '../node_modules/font-awesome/css/font-awesome.min.css';
import "./custom.scss";
import React from "react";
import $ from "jquery";
import ReactDOM from "react-dom";
import Pomodoro from "./components/Pomodoro.js";
import TimeSpan from "timespan";

var MyApp = React.createClass({
    render: function() {
        return (
            <Pomodoro workingTime={TimeSpan.fromSeconds(6)} pauseTime={TimeSpan.fromSeconds(3)} />
        );
    }
});

ReactDOM.render(
    <MyApp />, $("#app")[0]
);