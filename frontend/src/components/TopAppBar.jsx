import {
    Button, Typography, Toolbar, ListItemText, ListItemButton,
    ListItem, List, IconButton, Drawer, Divider, AppBar, Box, buttonClasses
} from '@mui/material';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { appBar } from '../constance/constance';
import Search from './Search';
import { Link, NavLink } from 'react-router-dom';

const drawerWidth = 240;
const navItems = appBar["customer"];

function TopAppBar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Link to={'/'}>
                <Typography variant="h5" sx={{ my: 2, fontFamily: 'Nunito', color: 'primary.main' }}>
                    FCOMPUTER
                </Typography>
            </Link>
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
        <Box component='header' sx={{ display: 'flex', alignItems: 'center' }}>
            <AppBar color='white' component="nav"
                sx={{
                    '& .MuiToolbar-root': {
                        px: '16px'
                    }
                }}
            >
                <Toolbar sx={{ height: '80px' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link to={'/'}>
                        <Button
                            sx={
                                isSearchFocused ?
                                    { display: 'none' } :
                                    {
                                        display: { xs: 'none', md: 'block' },
                                        '&:hover': {
                                            backgroundColor: 'transparent'
                                        },
                                        minWidth: '200px', 
                                        textDecoration: 'none'
                                    }}
                        >
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{ color: 'primary.main', fontFamily: 'nunito', fontWeight: 'bold' }}
                            >
                                FCOMPUTER
                            </Typography>
                        </Button>
                    </Link>
                    <Box sx={
                        isSearchFocused ?
                            { display: 'none' } :
                            { width: '300px', display: { xs: 'none', md: 'block' } }} />
                    <Box
                        sx={{
                            width: isSearchFocused ? '100%' : '600px',
                            minWidth: '170px',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'width 0.3s ease',
                            mx: 'auto'
                        }}
                    >
                        <Search
                            isSearchFocused={isSearchFocused}
                            setIsSearchFocused={setIsSearchFocused}
                        />
                    </Box>
                    <Box sx={
                        isSearchFocused ?
                            { display: 'none' } :
                            { justifySelf: 'flex-end', display: { xs: 'none', md: 'flex' }, alignItems: 'center', height: '100%', minWidth: '450px', width: '520px', justifyContent:'space-between'}}>
                        {navItems.map((item) => (
                            <NavLink
                                key={item.title}
                                to={item.path}
                            >
                                <Button
                                    color='black.main'
                                    size='large'
                                    sx={{
                                        [`& .${buttonClasses.startIcon} > *:nth-of-type(1)`]: {
                                            fontSize: '32px'
                                        },
                                        color: 'black.main',
                                        alignItems: 'center',
                                        height: '100%',
                                        flexDirection: 'column',
                                        px: '8px'
                                    }}>
                                    <item.icon fill='#000' width={32} height={32} />
                                    <Typography variant='button' sx={{ fontSize: '16px' }}>
                                        {item.title}
                                    </Typography>
                                </Button>
                            </NavLink>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    );
}

export default TopAppBar;
