import React, { Component } from "react";
import Swal from "sweetalert2";

class Disconnect extends Component {
  render() {
    return (
      <div>
        <button
          className={"disconnect"}
          value={"Refresh Page"}
          onClick={Disconnect._refreshPage}
        />
      </div>
    );
  }
  static _refreshPage() {
    Swal.fire({
      title: "Es-tu sûr de vouloir te déconnecter ?",
      text: "Tu pourras te reconnecter plus tard",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, je veux me déconnecter",
      cancelButtonText: "Annulé"
    }).then(_refreshPage => {
      if (_refreshPage.value) {
        console.log("Clicked");
        window.location.reload();
        Swal.fire("Déconnecté", "Tu t'es bien déconnecté.", "success");
      }
    });
  }
}

export default Disconnect;
