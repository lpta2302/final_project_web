import { AppProvider } from '@toolpad/core/AppProvider'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { useEffect, useMemo, useState } from "react"
import Logo from '../components/Logo'
import { useNavigate, Outlet } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { adminNav } from '../constance/constance.jsx'
import { AdminAccount } from './pages/index.js'

const initSession = {
  user: {
    name: 'Bharat Kashyap',
    email: 'bharatkashyap@outlook.com',
    image: 'https://avatars.githubusercontent.com/u/19550456',
  }
}

function AdminLayout({user = initSession}) {
  const [pathname, setPathname] = useState(user);
  const navigate = useNavigate();
  const [session, setSession] = useState(initSession);
  const authentication = useMemo(() => {
    return {
      signIn: () => {
        setSession(initSession);
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, [])

  useEffect(() => {

  }, []);

  const router = useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => {
        navigate('/admin' + path);
        setPathname(path);
      },
    };
  }, [navigate, pathname]);

  const handleLogoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/admin');
    window.location.reload();
  }

  return (
    <>
      <AppProvider
        navigation={adminNav}
        router={router}
        branding={{
          title: '', logo:
            <Box
              component='div'
              onClick={handleLogoClick}
              display='flex'
              alignItems='center'
            >
              <Logo />
              <Typography variant='subtitle2' ml='12px'>Admin</Typography>
            </Box>
        }}
        session={session}
        authentication={authentication}
      >
        <DashboardLayout >
          <Outlet />
        </DashboardLayout>
      </AppProvider>
    </>
  )
}

export default AdminLayout