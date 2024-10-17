import {
    Button, Typography, Toolbar, ListItemText, ListItemButton,
    ListItem, List, IconButton, Drawer, Divider, AppBar, Box, buttonClasses
} from '@mui/material';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Search from '../Search'
import { Link, NavLink } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { AccountCircleOutlined } from '@mui/icons-material';
import { customerNav } from '../../constance/constance.jsx';
import PropTypes from 'prop-types';
import Logo from '../Logo.jsx';
import { CartIcon } from '../../icons/CustomIcons.jsx';

const drawerWidth = 240;

const NavbarButton = ({ title, path, navIcon }) =>
    <NavLink to={path}>
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
            {navIcon}
            <Typography variant='button' sx={{ fontSize: '16px' }}>
                {title}
            </Typography>
        </Button>
    </NavLink>

const NavbarLink = ({ title, segment }) =>
    <NavLink to={segment} style={{ color: 'black' }}>
        <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={title} />
            </ListItemButton>
        </ListItem>
    </NavLink>

NavbarLink.propTypes = {
    title: PropTypes.string.isRequired,
    segment: PropTypes.string.isRequired
}

NavbarButton.propTypes = {
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    navIcon: PropTypes.node.isRequired,
}

const navItems = customerNav;

function TopAppBar() {
    const { isAuthenticated, user } = useAuthContext();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Link to={'/'}>
                <Logo margin='12px 0 12px 0' />
            </Link>
            <Divider />
            <List>
                {navItems.map((item) =>
                    <NavbarLink key={item.title} segment={item.segment} title={item.title} />)}
                {isAuthenticated ?
                    <NavbarLink segment='/profile' title={user.name} />

                    :
                    <NavbarLink segment='/login' title='Đăng nhập' />

                }
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
                            <Logo />
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
                    <IconButton
                        color="inherit"
                        edge="end"
                        sx={{ ml: 2, display: { md: 'none' } }}
                    >
                        <Link to='/cart' style={{color: 'unset'}}>
                            <CartIcon />
                        </Link>
                    </IconButton>
                    <Box sx={
                        isSearchFocused ?
                            { display: 'none' } :
                            { display: { xs: 'none', md: 'flex' }, alignItems: 'center', height: '100%', justifyContent: 'space-between', minWidth: '450px', width: '520px' }
                    }>
                        {navItems.map((item) => (
                            <NavbarButton title={item.title} path={item.segment} navIcon={item.icon} key={item.title} />
                        ))}
                        {
                            isAuthenticated ?
                                <NavbarButton title={user.name} navIcon={<AccountCircleOutlined />} path='/profile' /> :
                                <NavbarButton title='Đăng nhập' navIcon={<AccountCircleOutlined />} path='/login' />
                        }
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
