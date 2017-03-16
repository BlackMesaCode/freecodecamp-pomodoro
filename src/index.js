import '../node_modules/font-awesome/css/font-awesome.min.css';
import "./custom.scss";
import React from "react";
import $ from "jquery";
import ReactDOM from "react-dom";


var MyApp = React.createClass({
    render: function() {
        return (
            <h1>Up and running :-)</h1>
        );
    }
});

ReactDOM.render(
    <MyApp />, $("#app")[0]
);
