import React, { Component } from "react";


class Disconnect extends Component {
    render() {
        return (
            <div>
                <button className={"disconnect"} value={"Refresh Page"} onClick={Disconnect._refreshPage}/>
            </div>

        );
    }
    static _refreshPage() {
        console.log("Clicked");
        window.location.reload();
    }
}

export default Disconnect;
