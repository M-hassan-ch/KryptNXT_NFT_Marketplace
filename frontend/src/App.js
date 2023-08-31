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
import BuyNft from './components/pages/BuyNft';
import ViewMarkedRecord from './components/pages/ViewMarkedRecord';
import ViewBoughtRecord from './components/pages/ViewBoughtRecord';


function App() {
  return (
    <>

      <BrowserRouter>
        <ContractState>
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

            <Route path="/profile" element={<React.Fragment>
              <Profile />
            </React.Fragment>}>
            </Route>

            <Route path="/nft/:id" element={<React.Fragment>
              <ViewNft />
            </React.Fragment>}>
            </Route>

            <Route path="/nft/buy/:id" element={<React.Fragment>
              <BuyNft />
            </React.Fragment>}>
            </Route>

            <Route path="/markedRecord/:id" element={<React.Fragment>
              <ViewMarkedRecord />
            </React.Fragment>}>
            </Route>

            <Route path="/boughtRecord/:id" element={<React.Fragment>
              <ViewBoughtRecord />
            </React.Fragment>}>
            </Route>

            <Route path="/soldRecord/:id" element={<React.Fragment>
              <ViewBoughtRecord />
            </React.Fragment>}>
            </Route>

            <Route path="/:userA/settings" element={<React.Fragment>
              <Settings />
            </React.Fragment>}>


            </Route>

          </Routes>
        </ContractState>
      </BrowserRouter>

    </>
  );
}

export default App;
