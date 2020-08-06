export default {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "fixed",
    width: "20vw",
    backgroundColor: "lightblue",
    bottom: "220px",
    left: "40vw",
    borderRadius: "20px",
    zIndex: 1,
  },
  title: {
    margin: "5px",
    fontSize: "110%",
    fontWeight: "bold",
  },
  input: {
    display: "inline-block",
    height: "2em",
    fontSize: "2em",
    fontWeight: "bold",
    textAlign: "center",
    width: "8vw",
  },
  toolbar: {
    display: "flex",
    width: "15vw",
    justifyContent: "center",
  },
  button: {
    display: "inline-block",
    width: "6vw",
    flexGrow: 1,
    color: "white",
    backgroundColor: "blue",
    cursor: "pointer",
    margin: "5px",
  },
};