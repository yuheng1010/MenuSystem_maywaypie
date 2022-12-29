import React, { useDebugValue, useEffect, useContext, useState, useSyncExternalStore } from 'react';
import { BrowserRouter, Switch , Route , Routes , Link , NavLink ,Redirect } from "react-router-dom";
import Header from './Header.js'
import Homepage from './Homepage.js';
function App() {
  return (
    <React.Fragment>
      <Header />
      <Homepage />
    </React.Fragment>
  );
}

export default App;
