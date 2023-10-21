import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "./context/AuthContext.js"; // Asegúrate de importar el contexto correctamente
import { useAuthEndpoints } from "../api/apiClient.js";
import { loginAPI, loginAuthAPI } from "../api/requestAPI.js";
import { useLocation, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";

function Copyright(props) {
  return (
    <Typography color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const defaultTheme = createTheme();

export default function SignInSide() {
  const { setAuth } = useContext(AuthContext);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  // *************************************************** //

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const username = data.get("username");
    const password = data.get("password");

    console.log({
      user: data.get("username"),
      password: data.get("password"),
    });
    if (username === "" || password === "") {
      setOpenSnackbar(true); // Muestra el Snackbar si hay campos vacíos

      // alert("Campos vacios");
      return;
    }
    const api = useAuthEndpoints ? loginAuthAPI : loginAPI;
    api
      .post(username, password)
      .then((response) => {
        sessionStorage.setItem("isAuthenticated", "true");
        sessionStorage.setItem("userName", username);

        setAuth(true);
        console.log(`Login succesfull`);

        if (lastVisitedPage === "/logout") {
          navigate("/");
        } else if (lastVisitedPage) {
          navigate(lastVisitedPage);
        }
      })
      .catch((error) => {
        console.log(`No se pudo realizar el login: ${error.code}`);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          sx={{
            width: "100%",
            "& .MuiSnackbarContent-root": {
              backgroundColor: "#ff5722",
            },
            "& .MuiAlert-icon": {
              color: "#ffffff",
            },
            "& .MuiAlert-message": {
              color: "#ffffff",
            },
          }}
        >
          <Alert onClose={handleSnackbarClose} severity="error">
            Por favor, completa todos los campos.
          </Alert>
        </Snackbar>

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container style={{ textAlign: "start" }}>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
