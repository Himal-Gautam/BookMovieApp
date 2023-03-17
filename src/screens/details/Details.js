import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useParams } from "react-router-dom";
import { getLinearProgressUtilityClass } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import YouTube from "react-youtube";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import StarBorderIcon from "@mui/icons-material/StarBorder";  
import { Rating } from "@mui/material";
function Details({ baseUrl }) {
  const [movie, setMovie] = useState({});
  const [rating, setRating] = useState(0);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      fetch(`${baseUrl}movies/${id}`)
        .then((response) => response.json())
        .then((data) => {
          data.genres = data.genres.join(", ");
          const dateObj = new Date(data.release_date);
          data.release_date = dateObj.toDateString();
          setMovie(data);
        })
        .catch((error) => console.error(error));
    }
  }, []);

  const onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

   const handleRatingChange = (event, newValue) => {
     setRating(newValue);
   };
  
  function CustomIcon(props) {
    const { filled, ...rest } = props;
    return filled ? (
      <StarBorderIcon style={{ color: "yellow" }} {...rest} />
    ) : (
      <StarBorderIcon style={{ color: "black" }} {...rest} />
    );
  }
  
  return (
    <Box>
      <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
        <Box
          style={{
            marginLeft: "24px",
            marginTop: "8px",
            height: "24px",
            cursor: "pointer",
          }}
        >
          <Typography variant="body1" gutterBottom>
            {"< Back to Home"}
          </Typography>
        </Box>
      </Link>
      <Box sx={{ display: "flex" }}>
        <Container
          sx={{
            width: 1 / 5,
            // height: "100vh",
            // backgroundColor: "primary.dark",
          }}
        >
          <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            <ImageListItem sx={{ width: "100%" }}>
              <img src={movie.poster_url} alt={movie.title} loading="lazy" />
            </ImageListItem>
          </ImageList>
          {/* <img url={movie.poster_url} style={{ height: 350 }} /> */}
        </Container>
        <Container
          sx={{
            width: 3 / 5,
            // height: "100vh",
            // backgroundColor: "primary.light",
          }}
        >
          <Typography variant="h2" gutterBottom>
            {movie.title}
          </Typography>
          <Typography>
            <b>Genre:</b> {movie.genres}
          </Typography>
          <Typography>
            <b>Duration:</b> {movie.duration}
          </Typography>
          <Typography>
            <b>Release Date:</b> {movie.release_date}
          </Typography>
          <Typography>
            <b>Rating:</b> {movie.rating}
          </Typography>
          <Typography sx={{ mt: "16px" }}>
            <b>Plot: </b>
            <Link to={movie.wiki_url}>{"(Wiki Link)"}</Link> {movie.storyline}
          </Typography>
          <Typography sx={{ mt: "16px" }}>
            <b>Trailer:</b>
          </Typography>
          <YouTube
            videoId={movie.trailer_url}
            opts={{
              width: "100%",
              playerVars: {
                autoplay: 1,
              },
            }}
            onReady={onReady}
          />
        </Container>
        <Container
          sx={{
            width: 1 / 5,
            // height: "100vh",
            // backgroundColor: "primary.dark",
          }}
        >
          <Typography>
            <b>Rate This Movie:</b>
          </Typography>
          {/* <Box sx={{ display: "flex", direction:"row"}}>
            <StarBorderIcon/>
            <StarBorderIcon/>
            <StarBorderIcon/>
            <StarBorderIcon/>
            <StarBorderIcon/>
          </Box> */}
          <Rating
            name="rating"
            value={rating}
            // emptyIcon={
            //   <StarBorderIcon fontSize="inherit" style={{ color: "black" }} />
            // }
            // emptyIcon={
            //   <StarBorderIcon fontSize="inherit" style={{ color: "yellow" }} />
            // }
            icon={<CustomIcon />}
            onChange={handleRatingChange}
          />
          <Typography sx={{ mt: "16px", mb: "16px" }}>
            <b>Artists:</b>
          </Typography>
          <Box>
            <ImageList container cols={2}>
              {/* {movie.artists ? movie.artists.length : ""} */}
              {movie.artists &&
                movie.artists.map((artist) => (
                  <ImageListItem
                    key={artist.profile_url}
                    item
                    // xs={2}
                    sx={{ height: 250 }}
                    // style={{ cursor: "pointer" }}
                  >
                    <img
                      src={artist.profile_url}
                      style={{ height: 250, width: "100%" }}
                    ></img>
                    <ImageListItemBar
                      title={artist.first_name + " " + artist.last_name}
                      // subtitle={`Release Date: ${artist.release_date}`}
                    />
                  </ImageListItem>
                ))}
            </ImageList>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Details;
