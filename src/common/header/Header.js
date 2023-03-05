import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import logo from "../../assets/logo.svg";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./Header.css";
import Modal from "@mui/material/Modal";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TextField from "@mui/material/TextField";

function Header(props) {
  const [isLoggedin, setIsLoggedin] = React.useState(false);
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [username, setUsername] = React.useState(false);
  const [firstname, setFirstname] = React.useState(false);
  const [lastname, setLastname] = React.useState(false);
  const [email, setEmail] = React.useState(false);
  const [password, setPassword] = React.useState(false);
  const [contact, setContact] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let handleRegister = () => {
    fetch(props.baseUrl + "/v1/signup", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        first_name: firstname,
        last_name: lastname,
        mobile_number: contact,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        localStorage.setItem("id", data.id)
        setIsLoggedin(true);
        setOpen(false);
        setIsRegistered(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  let handleFormLogin = () => {
    fetch(props.baseUrl + "/signup", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: "string",
        first_name: "string",
        last_name: "string",
        mobile_number: "string",
        password: "string",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        localStorage.setItem("id", data.id);
        setIsLoggedin(true);
        setOpen(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    
  };
  let handleLogin = () => {
    setOpen(true);
  };

  let handleLogout = () => {
    setIsLoggedin(false);
  };

  let handleModal = () => {
    setOpen(!open);
  };

  let handleBookshow = () => {
    let id = 1;
    isLoggedin ? navigate(`/bookshow/${id}`) : setOpen(true);
  };

  React.useEffect(() => {
    checkLoginStatus();
  }, []);

  React.useEffect(() => {
    // const regEx = //movie/${[a-zA-Z0-9_.-]*/[a-zA-Z0-9_.-]*/
    let regex = new RegExp("/movie/${[a-zA-Z0-9_.-]*/[a-zA-Z0-9_.-]*");
    console.log(location.pathname.match(regex));
  }, [location]);

  let checkLoginStatus = () => {
    setIsLoggedin(sessionStorage.getItem("isLoggedIn"));
  };

  return (
    <div>
      <Box>
        <AppBar position="static">
          <Toolbar
            style={{
              paddingTop: "5px",
              paddingRight: "32px",
              paddingBottom: "5px",
              paddingLeft: "16px",
            }}
            sx={{
                maxHeight: 36,
              display: "flex",
              bgcolor: "#222",
              justifyContent: "space-between",
            }}
          >
            <img src={logo} className="App-logo" alt="logo" />
            <Stack direction="row" spacing={2}>
              {location.pathname !== "/movie/:id" && (
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={handleBookshow}
                >
                  Book Show
                </Button>
              )}
              {isLoggedin ? (
                <Button
                  size="small"
                  //   color="default"
                  variant="contained"
                  onClick={handleLogout}
                  className="Logout"
                >
                  Logout
                </Button>
              ) : (
                <Button
                  size="small"
                  //   color="default"
                  variant="contained"
                  onClick={handleLogin}
                  className="Login"
                >
                  Login
                </Button>
              )}
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>

      <Modal
        open={open}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            // width: "100%",
            typography: "body1",
          }}
        >
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                sx={{ width: "100%" }}
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab sx={{ width: "50%" }} label="Login" value="1" />
                <Tab sx={{ width: "50%" }} label="Register" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Box
                style={{ textAlign: "center" }}
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="on"
              >
                <TextField
                  id="username"
                  label="Username"
                  variant="standard"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  error={username === ""}
                  helperText={username === "" ? "Empty field!" : " "}
                />
                <TextField
                  id="password"
                  label="Password"
                  variant="standard"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  error={password === ""}
                  helperText={password === "" ? "Empty field!" : " "}
                />
                <Button variant="contained" onClick={handleFormLogin}>
                  Login
                </Button>
              </Box>
            </TabPanel>
            <TabPanel value="2">
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                style={{ textAlign: "center" }}
                autoComplete="on"
              >
                <TextField
                  id="firstname"
                  label="Firstname"
                  variant="standard"
                  required
                  onChange={(e) => setFirstname(e.target.value)}
                  error={firstname === ""}
                  helperText={firstname === "" ? "Empty field!" : " "}
                />
                <TextField
                  id="lastname"
                  label="Lastname"
                  variant="standard"
                  required
                  onChange={(e) => setLastname(e.target.value)}
                  error={lastname === ""}
                  helperText={lastname === "" ? "Empty field!" : " "}
                />
                <TextField
                  id="email"
                  label="Email"
                  variant="standard"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  error={email === ""}
                  helperText={email === "" ? "Empty field!" : " "}
                />
                <TextField
                  id="password"
                  label="Password"
                  variant="standard"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  error={password === ""}
                  helperText={password === "" ? "Empty field!" : " "}
                />
                <TextField
                  id="contact"
                  label="Contact"
                  variant="standard"
                  required
                  onChange={(e) => setContact(e.target.value)}
                  error={contact === ""}
                  helperText={contact === "" ? "Empty field!" : " "}
                />
                <Button variant="contained" onClick={handleRegister}>
                  Register
                </Button>
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
      </Modal>
    </div>
  );
}

export default Header;
