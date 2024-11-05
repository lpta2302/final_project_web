import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { TopAppBar } from "../components";

function RootLayout() {
  return (
    <>
      <Container sx={{ py: "88px" }}>
        <TopAppBar />

        <Outlet />
      </Container>
    </>
  );
}

export default RootLayout;
