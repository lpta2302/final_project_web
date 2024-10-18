import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { TopAppBar } from "../components";

import zIndex from "@mui/material/styles/zIndex";

function RootLayout() {
  return (
    <>
      <Container sx={{ py: "80px" }}>
        <TopAppBar />

        <Outlet />
      </Container>
    </>
  );
}

export default RootLayout;
