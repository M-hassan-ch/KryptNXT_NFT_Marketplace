import './App.css';
import Homepage from './components/pages/Homepage';
import CreateNft from './components/pages/CreateNft';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<React.Fragment>
            <Homepage />
          </React.Fragment>}>
          </Route>

          <Route path="/createNft" element={<React.Fragment>
            <CreateNft />
          </React.Fragment>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
