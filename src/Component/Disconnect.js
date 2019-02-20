import React, { Component } from "react";

class Disconnect extends Component {

    render() {
        return (
            <div>
                <form>
                <input className="disconnect" type={"submit"} value={"Disconnect"}/>
                </form>
            </div>
        );
    }
}

export default Disconnect;
