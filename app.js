import express from "express";
const app = express();
app.use(express.json());

const movies = [
  {
    id: 1,
    name: "Tenet",
  },
  {
    id: 2,
    name: "Interstellar",
  },
  {
    id: 3,
    name: "Fast and Furious",
  },
  {
    id: 4,
    name: "Avengers",
  },
  {
    id: 5,
    name: "Big Hero 6",
  },
];

const getMovie = async (req, res) => {
  const movie = await movies.find((mov) => mov.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send("resource not found");
  res.send(movie);
};

const updateMovie = async (req, res) => {
  const movie = await movies.find((mov) => mov.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send("resource not found");
  movie.name = req.body.name;
  res.send(movie);
};

const deleteMovie = async (req, res) => {
  const movie = await movies.find((mov) => mov.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send("resource not found");
  const index = movies.indexOf(movie);
  movies.splice(index, 1);
  res.send(movie);
};

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("hello bandekar");
});

app.get("/api/movies", (req, res) => {
  res.send(movies);
});

app.get("/api/movies/:id", getMovie);

app.post("/api/movies", (req, res) => {
  const name = req.body.name;
  const movie = {
    id: movies.length + 1,
    name,
  };

  movies.push(movie);
  res.send(movie);
});
