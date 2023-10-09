import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom"; // Importamos Outlet, Link y useNavigate para la navegación
import "../../App.css";
import marvel from "../../assets/marvel.jpg";
import home from "../../assets/home1.png";
import create from "../../assets/create.png";
import post from "../../assets/post.png";
import feature from "../../assets/feature.png";
import portada from "../../assets/superheroe-taquillero.jpg";
import Footer from "../Footer";
import SignInSide from "../SignInSide";
import { AuthContext, initAutenticacion } from "../context/AuthContext";
import { useState } from "react";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [auth, setAuth] = useState(initAutenticacion());
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  React.useEffect(() => {
    switch (currentPath) {
      case "/home":
        setTitle("Home");
        break;
      case "/create":
        setTitle("Create");
        break;
      case "/post":
        setTitle("Post");
        break;
      case "/feature":
        setTitle("Feature");
        break;
      default:
        setTitle("Menu");
        break;
    }
  }, [currentPath]);

  const handleMenuItemClick = (text) => {
    switch (text) {
      case "Home":
        navigate("/home");
        break;
      case "Create":
        navigate("/create");
        break;
      case "Post":
        navigate("/post");
        break;
      case "Feature":
        navigate("/feature");
        break;
      default:
        break;
    }
    handleDrawerToggle(); // Cierra el menú después de la navegación
  };

  const drawer = (
    <div>
      <Toolbar>
        <img className="imgLogo" src={marvel} alt="Logo" />
      </Toolbar>
      <Divider />
      <List style={{ marginTop: "25px" }}>
        {["Home", "Create", "Post", "Feature"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleMenuItemClick(text)}>
              <ListItemIcon style={{ height: "35px" }}>
                {(() => {
                  switch (text) {
                    case "Home":
                      return <img src={home} alt="" />;
                    case "Create":
                      return <img src={create} alt="" />;
                    case "Post":
                      return <img src={post} alt="" />;
                    case "Feature":
                      return <img src={feature} alt="" />;
                    default:
                      return <img src={wolve1} alt="" />;
                  }
                })()}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <AuthContext.Provider value={{ auth, setAuth }}>
        {!auth ? (
          <SignInSide />
        ) : (
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
              position="fixed"
              sx={{
                backgroundColor: " #333",
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
              }}
            >
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: "none" } }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                  {title}
                </Typography>
              </Toolbar>
            </AppBar>
            <Box
              component="nav"
              sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
              aria-label="mailbox folders"
            >
              <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Mejora el rendimiento en dispositivos móviles.
                }}
                sx={{
                  display: { xs: "block", sm: "none" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                    color: "white",
                    height: "900px",
                    background:
                      "linear-gradient(to bottom, black, #333, #666, #999, #ccc, white)",
                  },
                }}
              >
                {drawer}
              </Drawer>
              <Drawer
                variant="permanent"
                sx={{
                  display: { xs: "none", sm: "block" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                    color: "white",
                    height: "96vh",
                    background:
                      "linear-gradient(to bottom, black, #333, #666, #999, #ccc, white)",
                  },
                }}
                open
              >
                {drawer}
              </Drawer>
            </Box>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                backgroundColor: "black",
                marginBottom: "20px",
              }}
            >
              <Toolbar
                component="img"
                // height="250"
              />
              {currentPath === "/" ? (
                <img
                  style={{
                    // width: "85vw",
                    // height: "85vh",
                    objectFit: "cover",
                  }}
                  src={"https://w0.peakpx.com/wallpaper/120/664/HD-wallpaper-wolverine-amoled-comic-logan-marvel-thumbnail.jpg"}
                  alt="Portada"
                />
              ) : (
                <Outlet />
              )}
            </Box>
            <Footer />
          </Box>
        )}
      </AuthContext.Provider>
    </>
  );
}

export default ResponsiveDrawer;
