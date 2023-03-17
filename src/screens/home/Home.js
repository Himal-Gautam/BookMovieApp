import React from "react";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "./Home.css";
import { useLocation, useNavigate } from "react-router-dom";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ImageList from "@mui/material/ImageList";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Home({ baseUrl }) {
   const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [artists, setArtists] = useState([]);
  const [movieName, setMoviename] = useState("");
  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));
  const handleFilter = () => {};

  useEffect(() => {
    console.log(`${baseUrl}movies?page=1&limit=10`);
    fetch(`${baseUrl}movies?page=1&limit=10`)
      .then((data) => data.json())
      .then((resp) => {
        console.log(resp);
        setMovies(resp.movies);
      })
      .catch((e) => console.log(e));
    fetch(`${baseUrl}/genres`)
      .then((data) => data.json())
      .then((resp) => {
        console.log(resp);
        setGenres(resp.genres);
      })
      .catch((e) => console.log(e));
    fetch(`${baseUrl}/artists`)
      .then((data) => data.json())
      .then((resp) => {
        console.log(resp);
        setArtists(resp.artists);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleRDE = () => {};
  const handleRDS = () => {};


  return (
    <div>
      <div
        style={{
          textAlign: "center",
          backgroundColor: "#ff9999",
          padding: 8,
          fontSize: "1rem",
        }}
      >
        Upcoming Movies
      </div>
      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        <ImageList
          container
          sx={{
            flexGrow: 1,
            // maxHeight: 250,
            display: "flex",
            flexWrap: "nowrap",
          }}
        >
          {movies.map((movie) => (
            <ImageListItem
              key={movie.poster_url}
              item
              xs={2}
              sx={{ height: 250 }}
            >
              <img
                src={movie.poster_url}
                style={{ height: 250, width: 200 }}
              ></img>
              <ImageListItemBar title={movie.title} />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Container sx={{ width: "76%" }}>
          <ImageList container cols={4}>
            {movies.map((movie) => (
              <ImageListItem
                key={movie.poster_url}
                item
                xs={2}
                sx={{ height: 350, width: 200 }}
                style={{ cursor: "pointer" }}
                onClick={()=> navigate(`/movie/${movie.id}`)}
              >
                <img
                  src={movie.poster_url}
                  style={{ height: 350, width: 200 }}
                ></img>
                <ImageListItemBar
                  title={movie.title}
                  subtitle={`Release Date: ${movie.release_date}`}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Container>
        <Container sx={{ width: "24%" }}>
          <Card sx={{ minWidth: 275 }}>
            <CardHeader title="FIND MOVIES BY:" />
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                gap: 3,
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TextField
                  id="standard-multiline-flexible"
                  label="Movie Name"
                  variant="standard"
                />
                <TextField
                  id="standard-select-currency"
                  select
                  label="Genres"
                  defaultValue="EUR"
                  placeholder="Genres"
                  variant="standard"
                >
                  {genres.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.genre}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="standard-select-currency"
                  select
                  label="Artists"
                  defaultValue="EUR"
                  placeholder="Artists"
                  variant="standard"
                >
                  {artists.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {`${option.first_name} ${option.last_name}`}
                    </MenuItem>
                  ))}
                </TextField>
                <DesktopDatePicker
                  label="Date desktop"
                  inputFormat="MM/DD/YYYY"
                  value={value}
                  onChange={handleRDS}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DesktopDatePicker
                  label="Date desktop"
                  inputFormat="MM/DD/YYYY"
                  value={value}
                  onChange={handleRDE}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </CardContent>
            <CardActions>
              <Button sx={{ width: "100%" }} variant="contained">
                APPLY
              </Button>
            </CardActions>
          </Card>
        </Container>
      </Box>
    </div>
  );
}

export default Home;
