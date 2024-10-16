import { Container } from '@mui/material'
import TopAppBar from '../components/TopAppBar'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <>
        <Container sx={{py: '80px'}}>
          <TopAppBar/>
          <Outlet/>
        </Container>
    </>
  )
}

export default RootLayout