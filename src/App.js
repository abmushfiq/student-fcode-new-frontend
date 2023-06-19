import React from "react";
import "./App.css";
import DataGrid from "./pages/DataGrid";

import { Provider } from "react-redux";
import store from "./store/store";

import Students from "./components/Students";
import Loading from "./components/Loading";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <DataGrid />
      </div>
      {/* <Students/> */}
      {/* <Loading type=""/> */}
    </Provider>
  );
}

export default App;
