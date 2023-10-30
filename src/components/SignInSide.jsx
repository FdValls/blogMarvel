import React, { useContext, useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../util/CustomSnackbar.jsx";

function Copyright() {
  return (
    <Typography
      color="text.secondary"
      align="center"
      style={{ marginTop: "20px" }}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignInSide() {
  const { setAuth } = useContext(AuthContext);
  const [warningSnackbar, setWarningSnackbar] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const [successSnackbar, setSuccessSnackbar] = useState(false);

  const navigate = useNavigate();

  const handleSnackbarClose = () => {
    setWarningSnackbar(false);
    setErrorSnackbar(false);
    setSuccessSnackbar(false);
  };

  useEffect(() => {
    if (successSnackbar) {
      setTimeout(() => {
        setAuth(true);
        console.log(`Login exitoso`);
      }, 1000);
    }
  }, [successSnackbar]);

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
      setWarningSnackbar(true);
      return;
    }else{
      sessionStorage.setItem("isAuthenticated", "true");
      sessionStorage.setItem("userName", username);
      setSuccessSnackbar(true);
      navigate("/");
    }
    
    const api = useAuthEndpoints ? loginAuthAPI : loginAPI;
    api
      .post(username, password)
      .then((response) => {
        sessionStorage.setItem("isAuthenticated", "true");
        sessionStorage.setItem("userName", username);
        setSuccessSnackbar(true);

        const lastVisitedPage = localStorage.getItem("lastVisitedPage");

        if (lastVisitedPage === "/logout") {
          navigate("/");
        } else if (lastVisitedPage) {
          navigate(lastVisitedPage);
        }
      })
      .catch((error) => {
        setTimeout(() => {
          setErrorSnackbar(!successSnackbar);
          console.log(`No se pudo realizar el login: ${error.code}`);
        }, 1500);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <CustomSnackbar
          open={warningSnackbar}
          onClose={handleSnackbarClose}
          message="Por favor, completa todos los campos."
          severity="warning"
          duration={3000}
        />
        <CustomSnackbar
          open={errorSnackbar}
          onClose={handleSnackbarClose}
          message="Error al realizar el inicio de sesión."
          severity="error"
          duration={3000}
        />
        <CustomSnackbar
          open={successSnackbar}
          onClose={handleSnackbarClose}
          message="Login success."
          severity="success"
          duration={2000}
        />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://www.mundodeportivo.com/alfabeta/hero/2023/08/el-superman-de-marvel-volvera-a-las-paginas-de-los-comics-de-una-forma-bastante-inusual.jpg?width=768&aspect_ratio=16:9&format=nowebp)",
              // "url(https://www.mundodeportivo.com/alfabeta/hero/2023/08/el-superman-de-marvel-volvera-a-las-paginas-de-los-comics-de-una-forma-bastante-inusual.jpg?width=768&aspect_ratio=16:9&format=nowebp)",
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
            <Typography component="h1" variant="h5" color={"black"}>
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
