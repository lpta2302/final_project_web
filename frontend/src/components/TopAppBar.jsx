import { Button, Typography, Toolbar, ListItemText, ListItemButton, ListItem, List, IconButton, Drawer, Divider, AppBar, Box, buttonClasses } from '@mui/material'
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu'
import { appBar } from '../constance/constance';
import Search from './Search';
const drawerWidth = 240;
const navItems = appBar["customer"];

function TopAppBar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h5" sx={{ my: 2, fontFamily: 'Nunito' }}>
                FCOMPUTER
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.title} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AppBar component="nav">
                <Toolbar sx={{ height: '80px' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Button
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            mr: '120px'
                        }}
                    >
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{ color: '#fff', fontFamily: 'nunito', fontWeight: 'bold' }}
                        >
                            FCOMPUTER
                        </Typography>
                    </Button>
                    <Box
                        sx={{
                            flexGrow: 1,
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Search />
                    </Box>
                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', height: '100%' }}>
                        {navItems.map((item) => (
                            <Button
                                size='large'
                                startIcon={<item.icon fill='#fff' width={32} height={32} />}
                                key={item.title}
                                sx={{
                                    [`& .${buttonClasses.startIcon} > *:nth-of-type(1)`]: {
                                        fontSize: '32px'
                                    },
                                    color: '#fff',
                                    alignItems: 'center',
                                    height: '100%'
                                }}>
                                <Typography>{item.title}</Typography>
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', ml: '20px', height: '100%' }}>
                        <Button
                            size='large' sx={{ color: '#fff' }}>Đăng nhập</Button>
                        <Divider sx={{ bgcolor: '#fff', height: '40%', width: '1px', mx: '4px' }} orientation='vertical' variant='middle' ></Divider>
                        <Button
                            size='large' sx={{ color: '#fff' }}>Đăng ký</Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <Box component="main" sx={{ p: 3 }}>
                <Toolbar />
            </Box>
        </Box>
    );
}

export default TopAppBar;
