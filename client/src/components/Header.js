import React from "react";

const styles = {
  container: {
    display: "flex",
    backgroundColor: "blue",
    color: "white",
  },
  logo: {
    width: "50px",
  },
  info: {
    flexGrow: 1,
    contentJustify: "center",
    textAlign: "center",
    lineHeight: "1.5rem",
  },
  control: {
    width: "50px",
    lineHeight: "1.5rem",
  },
};
export const Header = (props) => {
  return (
    <div style={styles.container}>
      <div style={styles.logo}></div>
      <div style={styles.info}>Game Not Started</div>
      <div style={styles.control}>
        <i className="fa fa-gear" />
      </div>
    </div>
  );
};
