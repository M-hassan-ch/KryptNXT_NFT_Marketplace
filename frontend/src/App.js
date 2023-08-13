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
import Settings from './components/pages/Settings';
import { ContractState } from './context/contractState';


function App() {
  return (
    <>
      <ContractState>
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

            <Route path="/:userA/settings" element={<React.Fragment>
              <Settings />
            </React.Fragment>}>
            </Route>

          </Routes>
        </BrowserRouter>
      </ContractState>
    </>
  );
}

export default App;
