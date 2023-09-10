import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "../components/Header/Header";
import { Nav } from "../components/Nav/Nav";
import { StakingStats } from "../components/StakingStats/StakingStats";
import { Footer } from "../components/Footer/Footer";
import { Main } from "../components/Main/Main";
import { Background } from "../components/Background/Background";

export const SharedLayout = () => {
  return (
    <div>
      <Header />
      <Main>
        <Background>
          <StakingStats />
          <Nav />
        </Background>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </Main>
      <Footer />
    </div>
  );
};
