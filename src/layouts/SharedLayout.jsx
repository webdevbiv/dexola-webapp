import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "../components/Header/Header";
import { Nav } from "../components/Nav/Nav";
import { StakingStats } from "../components/StakingStats/StakingStats";
import { Footer } from "../components/Footer/Footer";
import { Main } from "../components/Main/Main";
import { Background } from "../components/Background/Background";
import { HeaderBar } from "../components/HeaderBar/HeaderBar";
import useWindowWidth from "../Hooks/useWindowWidth";
import { MobileScroll } from "../components/MobileScroll/MobileScroll";

export const SharedLayout = () => {
  const windowWidth = useWindowWidth();

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
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </Main>
      <Footer />
    </>
  );
};
