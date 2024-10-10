import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Logo from "../assets/Logo.png";
import { AiFillHome } from "react-icons/ai";
import { IoMdAdd, IoIosPeople } from "react-icons/io";
import { MdAccountBalance } from "react-icons/md";
import { GoGitPullRequest } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import Container from "@mui/material/Container";
import { useState } from "react";
import { Avatar, Menu, MenuItem, Tooltip } from "@mui/material";
import LogoutHelper from "../Helper/LogoutHelper";
import { useSelector } from "react-redux";

// import { FaPeopleGroup } from 'react-icons/fa';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Wrapper({ open, setOpen, mylocation }) {
  const { loginUser, validateUser } = useSelector((state) => state);
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const toogle = Boolean(anchorEl);
  //   const handleDrawerOpen = () => {
  //     setOpen(true);
  //   };
  console.log(loginUser?.login?.data?.data, " loginUser?.login?.data");
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar style={{ backgroundColor: "black" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => {
                setOpen(!open);
              }}
              edge="start"
            >
              <MenuIcon />
            </IconButton>

            <Box
              component="img"
              sx={{
                height: 56,
                margin: 1,
              }}
              alt="Your logo."
              src={Logo}
            />
            <Container
              maxWidth="100vw"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: 0,
                margin: 0,
                maxWidth: "none",
              }}
            >
              <Typography
                sx={{}}
                variant="h6"
                noWrap
                component="div"
                marginTop={1}
              >
                {`${
                  loginUser?.login?.data?.data?.name ||
                  localStorage.getItem("name")
                }`}
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                }}
                variant="h6"
                noWrap
                component="div"
              >
                {/* PROFILE MENU */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={toogle ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={toogle ? "true" : undefined}
                    >
                      <Avatar sx={{ width: 32, height: 32 }}>
                        {loginUser?.login?.data?.data?.name
                          ?.charAt(0)
                          .toUpperCase() ||
                          localStorage.getItem("name")?.charAt(0).toUpperCase()}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={toogle}
                  onClose={handleClose}
                  onClick={handleClose}
                  slotProps={{
                    paper: {
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&::before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={handleClose}>
                    <Avatar /> Profile
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Avatar /> My account
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <MenuItem onClick={() => LogoutHelper.logout()}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
                {/* Profile Picture closed */}
              </Typography>
            </Container>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              className={`${
                mylocation === "/landlord-dashboard" ? "active-li" : ""
              }`}
              onClick={() => {
                navigate("/landlord-dashboard");
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  marginTop: 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <AiFillHome size={20} />
                </ListItemIcon>
                <ListItemText primary={open ? "Dashboard" : null} />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              className={`${
                mylocation === "/add-new-tenant" ? "active-li" : ""
              }`}
              onClick={() => {
                navigate("/add-new-tenant");
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <IoMdAdd size={20} />
                </ListItemIcon>
                <ListItemText primary={open ? "Add New Tenant" : null} />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              className={`${mylocation === "/new-request" ? "active-li" : ""}`}
              onClick={() => {
                navigate("/new-request");
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <GoGitPullRequest size={20} />
                </ListItemIcon>
                <ListItemText primary={open ? "New Request" : null} />
              </ListItemButton>
            </ListItem>

            <ListItem
              disablePadding
              sx={{ display: "block" }}
              className={`${mylocation === "/all-tenant" ? "active-li" : ""}`}
              onClick={() => {
                navigate("/all-tenant");
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <IoIosPeople size={20} />
                </ListItemIcon>
                <ListItemText primary={open ? "All Tenant" : null} />
              </ListItemButton>
            </ListItem>

            <ListItem
              disablePadding
              sx={{ display: "block" }}
              className={`${mylocation === "/bank-detail" ? "active-li" : ""}`}
              onClick={() => {
                navigate("/bank-detail");
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <MdAccountBalance size={20} />
                </ListItemIcon>
                <ListItemText primary={open ? "ACCOUNT DETAIL" : null} />
              </ListItemButton>
            </ListItem>

            <ListItem
              disablePadding
              sx={{ display: "block" }}
              // onClick={() => {
              //   sessionStorage.clear();
              //   localStorage.clear("name")
              //   localStorage.clear("user_id")
              //   localStorage.clear("token")
              //   setTimeout(() => {
              //     dispatch(ValidateUser({}))
              //     dispatch(reset())
              //     navigate("/");
              //   }, 1000);

              // }}
              onClick={() => LogoutHelper.logout()}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <Logout size={20} />
                </ListItemIcon>
                <ListItemText primary={open ? "LOGOUT" : null} />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 5 }}></Box>
      </Box>
    </>
  );
}
