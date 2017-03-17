import '../node_modules/font-awesome/css/font-awesome.min.css';
import "./index.scss";

import React from "react";
import $ from "jquery";
import ReactDOM from "react-dom";
import Pomodoro from "./components/Pomodoro.js";
import TimeSpan from "timespan";

var MyApp = React.createClass({
    render: function() {
        return (
            <Pomodoro workingTime={TimeSpan.fromMinutes(25)} pauseTime={TimeSpan.fromMinutes(5)} />
        );
    }
});

ReactDOM.render(
    <MyApp />, $("#app")[0]
);