import { AppProvider } from '@toolpad/core/AppProvider'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { useMemo, useState } from "react"
import Logo from '../components/Logo'
import { useNavigate, Outlet } from 'react-router-dom'
import { Box, Grid2, Typography } from '@mui/material'
import { adminNav } from '../constance/constance.jsx'

const initSession = {
  user: null
}

function AdminLayout() {
  const [pathname, setPathname] = useState('/admin');
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


  // useEffect(() => {
  //   if (session.user === null) {
  //     navigate('login');
  //   } else {
  //     return;
  //   }
  // }, [session.user, navigate]);

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
            <Typography variant='subtitle2' ml={{ sm: '12px', xs: 'none' }}>Admin</Typography>
          </Box>
      }}
      session={session}
      authentication={authentication}
    >
      <DashboardLayout>
          <Outlet />
      </DashboardLayout>
    </AppProvider>
  )
}

export default AdminLayout