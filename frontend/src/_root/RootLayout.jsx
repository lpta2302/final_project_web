import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { TopAppBar } from "../components";

function RootLayout() {
  return (
    <>
      <Container sx={{ py: "88px", px:{xs: '4px', md: '8px'}, overflowX: 'hidden'}}>
        <TopAppBar />

        <Outlet />
      </Container>
    </>
  );
}

export default RootLayout;
