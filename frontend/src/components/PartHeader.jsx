import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PartHeader.module.css";
import back from "../assets/icons/return.png";

function PartHeader({ partName }) {
  const navigate = useNavigate();
  return (
    <div className={styles.partHeader}>
      <button
        // TODO revoir la navigation
        onClick={() => navigate("/")}
        className={styles.back}
        type="button"
      >
        <img src={back} alt="flèche de retour en arrière" />
      </button>
      <h1>{partName}</h1>
    </div>
  );
}

export default PartHeader;

PartHeader.propTypes = {
  partName: PropTypes.string.isRequired,
};
