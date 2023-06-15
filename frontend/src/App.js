import './App.css';
import Homepage from './components/pages/Homepage';
import CreateNft from './components/pages/CreateNft';
import ExploreNfts from './components/pages/ExploreNfts';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ExploreProfiles from './components/pages/ExploreProfiles';


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

          <Route path="/explore/nfts" element={<React.Fragment>
            <ExploreNfts />
          </React.Fragment>}>
          </Route>

          <Route path="/explore/profiles" element={<React.Fragment>
            <ExploreProfiles />
          </React.Fragment>}>
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
