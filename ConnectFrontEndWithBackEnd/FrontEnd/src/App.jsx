import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [jokes, setjokes] = useState([]);

  useEffect(() => {
    axios
      .get("/api/jokes")
      .then((response) => {
        setjokes(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <>
      <h1>A LOVE S</h1>
      <p>JOKES: {jokes.length}</p>

      {

      jokes.map((joke) => (
        <div key={joke.id}>
          <h3>{joke.title}</h3>
          <p>{joke.content}</p>
        </div>
      ))
      }
    </>
  );
}

export default App;
