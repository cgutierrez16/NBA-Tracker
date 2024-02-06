import React, { useEffect, useState } from "react";
import axios from "axios";
import { Game } from "../components/game";
import { getFormattedDate } from "../misc/date-utils";
import { useNumericalValue } from "../context/date-context";

export const GamesPage = () => {
  const { numericalValue } = useNumericalValue();
  const [gamesReal, setGamesReal] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `https://www.balldontlie.io/api/v1/games?start_date=${getFormattedDate(
          numericalValue
        )}&end_date=${getFormattedDate(numericalValue)}`;
        const response = await axios.get(apiUrl);
        setGamesReal(response.data);
      } catch (error) {
        console.error("Error during API request:", error);
      }
    };

    fetchData();
  }, [numericalValue]);

  return (
    <div className="container">
      <div className="row">
        {gamesReal.data && Array.isArray(gamesReal.data) ? (
          gamesReal.data.map((game, index) => (
            <div key={index} className='col-sm-6 my-4'>
              {console.log(game)}
              <Game gameData={game}/>
            </div>
          ))
        ) : (
          <p>No games data available</p>
        )}
      </div>
    </div>
  );
};