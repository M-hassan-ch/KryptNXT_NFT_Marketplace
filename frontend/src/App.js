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
import ViewNft from './components/pages/ViewNft';
import Profile from './components/pages/Profile';


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

          <Route path="/profile/:id" element={<React.Fragment>
            <Profile />
          </React.Fragment>}>
          </Route>

          <Route path="/nft/:id" element={<React.Fragment>
            <ViewNft />
          </React.Fragment>}>
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
