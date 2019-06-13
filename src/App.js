import React, { useRef } from "react";
import logo from "./logo.svg";
import "./App.scss";

// import React bindings for Redux
import { connect } from "react-redux";

const App = (props) => {

  // Destructuring assignment from Props
  const { fetching, message, onRequestNumber, error } = props;

  // UseRef hook
  const numRef = useRef(null);
  //Dan Says -> https://twitter.com/dan_abramov/status/1011238901254639616

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Numbers</h1>
        {message &&
          <blockquote>{message}</blockquote>
        }

        <div>
          <i className="App-intro">Insert a number</i>
          <p><input defaultValue="23" ref={numRef} type="number"></input></p>
        </div>

        {fetching ? (
          <button className="btn btn-success">Fetching...</button>
        ) : (
            <button className="btn btn-primary" onClick={() => onRequestNumber(numRef.current.value)}>Show info about this number</button>
          )}

        {error && <p style={{ color: "red" }}>Uh oh - something went wrong!</p>}
        <p className="credits">Powered by <a rel="noopener noreferrer" target="_blank" href="http://numbersapi.com">NumbersAPI</a> without <a rel="noopener noreferrer" target="_blank" href="https://github.com/FBW-12/numbers-api-proxy">CORS</a></p>
      </header>
    </div >
  );

}

// Extracting Data with mapStateToProps
const mapStateToProps = state => {
  return {
    fetching: state.fetching,
    message: state.message,
    error: state.error
  };
};

// Dispatching actions with mapDispatchToProps
const mapDispatchToProps = dispatch => {
  return {
    onRequestNumber: (num) => {
      console.log(num);

      return dispatch({ type: "API_CALL_REQUEST", number: num })
    }
  };
};

// the connect() function connects the React component to the Redux store.
export default connect(mapStateToProps, mapDispatchToProps)(App);