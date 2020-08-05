import styled from "styled-components";

export const View = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 50vw;
  margin-left: 25vw;
  bottom: 220px;
  align-items: stretch;
  background-color: lightgray;
  border: 2px solid black;
  border-radius: 5px;
`;

export const Header = styled.div`
  text-align: center;
  background-color: lightgray;
  height: 1em;
`;

export const Toggle = styled.div.attrs((props) => ({
  className: props.show ? "fa fa-caret-down" : "fa fa-caret-up",
}))`
  display: inline-block;
  color: blue;
  width: 48vw;
  cursor: pointer;
`;

export const MessageList = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  height: 30vh;
  overflow: scroll;
  border: 1px solid blue;
  background-color: white;
`;

export const Form = styled.form`
  display: ${(props) => (props.show ? "flex" : "none")};
`;

export const Input = styled.input.attrs((props) => ({
  value: props.value,
  placeholder: "Enter text to chat",
}))`
  margin: 3px;
  height: 2em;
  padding: 3px;
  line-height: 2em;
  width: 100%;
`;
