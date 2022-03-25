import React from "react";
import PropTypes from "prop-types";
import Loading from "./Loading";

export default function Players(props) {
  const players = props.players.map((player) =>
    <li key={player.username}>
      <img src={player.imageUrl} alt={`Avatar for ${player.username}`} />
      {player.username}
    </li>
  );
  return (
    players.length === 0
      ? <Loading message="no-one here yet... :(" />
      : <ul className="players">{players}</ul>
  );
}

Players.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired
  })).isRequired
}