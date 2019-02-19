import React, { Component } from "react";

class Disconnect extends Component {
    constructor(props) {
        super(props);
        const disconnect = "";
        this.state = { disconnect };
    };

    render() {

        return (
            <div>
                <button type="button" onClick={this.setState} value="Disconnect">Disconnect</button>
            </div>
        );
    }
}
export default Disconnect;
