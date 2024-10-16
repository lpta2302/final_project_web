import { AppProvider } from '@toolpad/core/AppProvider'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { AccountBoxOutlined, Dashboard, WarehouseOutlined } from "@mui/icons-material"
import { useMemo, useState } from "react"
import Logo from '../components/Logo'
import { useNavigate, Outlet } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { BoxIcon, OrderTextIcon, VoucherIcon } from '../icons/CustomIcons'

const nav = [
  {
    kind: 'header',
    title: 'Quản lý hàng hóa'
  },
  {
    segment: 'manage-product',
    title: 'Sản phẩm',
    icon: <BoxIcon />
  },
  {
    segment: 'manage-inventory',
    title: 'Kho hàng',
    icon: <WarehouseOutlined />
  },
  {
    kind: 'header',
    title: 'Quản lý mua hàng'
  },
  {
    segment: 'manage-voucher',
    title: 'Mã giảm giá',
    icon: <VoucherIcon />
  },
  {
    segment: 'manage-order',
    title: 'Đơn hàng',
    icon: <OrderTextIcon />
  },
  {
    kind: 'header',
    title: 'Quản lý tài khoản'
  },
  {
    segment: 'manage-account',
    title: 'Tài khoản',
    icon: <AccountBoxOutlined />
  },
  {
    segment: 'dashboard',
    title: 'Thống kê',
    icon: <Dashboard />
  }];


function AdminLayout() {
  const [pathname, setPathname] = useState("/admin");
  const navigate = useNavigate();

  const router = useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => {
        navigate(path);
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
        navigation={nav}
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
      >
        <DashboardLayout >
          <Outlet />
        </DashboardLayout>
      </AppProvider>
    </>
  )
}

export default AdminLayout