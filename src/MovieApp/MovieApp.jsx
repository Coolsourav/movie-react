import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./movieapp.css";
import logo from "./images/logo1.png";
import Searchbar from "./Searchbar";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function MovieApp() {
  const [movieList, setMovieList] = useState([]);
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
   const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=6d3e968d45aab0b781addb1496377ba6"
    )
      .then((response) => response.json())
      .then((data) => {
        setMovieList(data.results)
        setOriginalData(data.results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (search) {
      const handleapi = async () => {
        try {
          let response = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=6d3e968d45aab0b781addb1496377ba6`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          let data = await response.json();
          setMovieList(data.results);
        } catch (error) {
          console.log(error.message);
        }
      };
      handleapi();
    }
  }, [search]);

  function SingleCard({ movie }) {
    return (
      <Card style={{ width: "20rem", marginTop: "15px" }}>
        <Card.Img
          variant="top"
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt={`${movie.title} backdrop`}
        />
        <Card.Body className="">
          <Card.Title className="text-center">{movie.title}</Card.Title>
          <Card.Title className="card-txt text-center">
            Play Trailer<PlayArrowIcon />
          </Card.Title>
        </Card.Body>
      </Card>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(input);
    setInput("")
  };

  const reset = () => {
    setMovieList(originalData);
  };

  return (
    <>
      <div className="hero">
        <div className="nav-div">
          <Navbar
            collapseOnSelect
            expand="lg"
            style={{ backgroundColor: "inherit" }}
            data-bs-theme="dark"
          >
            <Container>
              <img
                src={logo}
                alt="img"
                onClick={reset}
                style={{ cursor: "pointer" }}
              />
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="#features">Home</Nav.Link>
                  <Nav.Link href="#pricing">Movies</Nav.Link>
                  <Nav.Link href="#pricing">Series</Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link href="#deets">Help</Nav.Link>
                  <Nav.Link eventKey={2} href="#memes">
                    Login
                  </Nav.Link>
                  <Button className="btn mx-2" size="sm" variant="danger">
                    Sign Up
                  </Button>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <div className="d-flex justify-content-center">
            <Searchbar
              input={input}
              onInputChange={setInput}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
        <div className="container mt-4 d-flex justify-content-evenly flex-wrap gap-3">
          {movieList.length > 0 ? (
            movieList.map((movie, index) => (
              <SingleCard className="card" key={index} movie={movie} />
            ))
          ) : (
            <div className="text-center">
              <p className="text-white">No movies found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
