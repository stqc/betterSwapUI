import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import './navBar.css';
import betterS from './Xgczj6_2_.svg';
import { buildChart,buildChartM } from './connection.js';
import { connectToWeb3, getConnectedAccount,connectedAccount } from './connection.js';




const ResponsiveAppBar = (props) => {
 const [acc,changeAcc] = React.useState('Connect')
  const pages = ['Trade', "Manage Token",(<Button id ="con-btn"variant="outlined"  onClick={async ()=>{
    await connectToWeb3();
    await changeAcc(connectedAccount[0].slice(0,8)+"...")
    await props.ccc(true);
    props.alert("Connected To "+connectedAccount[0].slice(0,8)+"...");
  }}style={{color:"#d19b00",
  borderColor:"#d19b00"}}>{acc}</Button>)];
  React.useEffect(()=>{
    console.log(connectedAccount)
    if(connectedAccount){
    changeAcc(connectedAccount[0].slice(0,8)+"...")}
  },[connectedAccount])
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
 
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={{backgroundColor:"transparent"}}>
      
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <img src={betterS} style={{width:"3%"}} id="pc-logo"/>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Merriweather Sans',
              fontWeight: 500,
              letterSpacing: '.1rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            BetterSwap
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                backgroundColor:"grey"
              }}
            >
              
              <MenuItem style={{backgroundColor:"rgb(34,34,34)",color:"#b6b6b6"}} onClick={async()=>{handleCloseNavMenu();props.views("Trade"); await buildChartM();}}>
                  <Typography textAlign="center">{"Trade"}</Typography>
                </MenuItem>
                {/* <MenuItem style={{backgroundColor:"rgb(34,34,34)",color:"#b6b6b6"}} onClick={async()=>{handleCloseNavMenu();props.views("Create Token"); await buildChartM();}}>
                  <Typography textAlign="center">{"Create Token"}</Typography>
                </MenuItem> */}
                <MenuItem style={{backgroundColor:"rgb(34,34,34)",color:"#b6b6b6"}} onClick={async()=>{handleCloseNavMenu();props.views("Manage Token"); await buildChartM();}}>
                  <Typography textAlign="center">{"Manage Token"}</Typography>
                </MenuItem>
                <MenuItem style={{backgroundColor:"rgb(34,34,34)",color:"#b6b6b6"} } onClick={handleCloseNavMenu}>
                <Button id ="con-btn"variant="outlined"  onClick={async ()=>{
                    await connectToWeb3();
                    await changeAcc(connectedAccount[0].slice(0,8)+"...")
                    await props.ccc(true);
                    props.alert("Connected To "+connectedAccount[0].slice(0,8)+"...");
                  }}style={{color:"#d19b00",
                  borderColor:"#d19b00"}}>{acc}
                </Button>
                </MenuItem>
            </Menu>
          </Box>
          <img src={betterS} style={{width:"8%"}} id="m-logo"/>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Merriweather Sans',
              fontWeight: 500,
              letterSpacing: '.1rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            BetterSwap
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button style={{color:"black"}} onClick={async ()=>{handleCloseNavMenu(); props.views("Trade");await buildChart();}}>
              {"Trade"}
            </Button>
            {/* <Button style={{color:"black"}}onClick={async ()=>{handleCloseNavMenu(); props.views("Create Token");await buildChart();}}>
              {"Create Token"}
            </Button> */}
            <Button style={{color:"black"}} onClick={async ()=>{handleCloseNavMenu(); props.views("Manage Token");await buildChart();}}>
              {"Manage Token"}
            </Button>
            <Button id ="con-btn"variant="outlined"  onClick={async ()=>{
              await connectToWeb3();
              await changeAcc(connectedAccount[0].slice(0,8)+"...")
              await props.ccc(true);
              props.alert("Connected To "+connectedAccount[0].slice(0,8)+"...");
            }}style={{color:"#d19b00",
            borderColor:"#d19b00"}}>{acc}
          </Button>
          </Box>

          
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
