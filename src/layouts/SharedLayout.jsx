import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "../components/Header/Header";
import { Nav } from "../components/Nav/Nav";
import { StakingStats } from "../components/StakingStats/StakingStats";
import { Footer } from "../components/Footer/Footer";
import { Main } from "../components/Main/Main";
import { Background } from "../components/Background/Background";
import { HeaderBar } from "../components/HeaderBar/HeaderBar";
import { LoadingSpinner } from "../components/LoadingSpinner/LoadingSpinner";

export const SharedLayout = () => {
  return (
    <>
      <Header>
        <Background>
          <HeaderBar />
          <StakingStats />
          <Nav />
        </Background>
      </Header>
      <Main>
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </Main>
      <Footer />
    </>
  );
};
