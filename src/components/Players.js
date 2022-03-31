import React from "react";
import PropTypes from "prop-types";
import Loading from "./Loading";
import Avatar from "./Avatar";
import DOMPurify from "dompurify";

export default function Players(props) {
  const players = props.players.map(function (player) {
    const svg = DOMPurify.sanitize(player.avatar, {
      USE_PROFILES: { svg: true },
    });

    return (<li key={player.username}>
      <Avatar svg={svg} />
      <span className="player-name">{player.username}</span>
    </li>)
  }
  );

  return (
    players.length === 0
      ? <Loading message="no-one here yet... :(" />
      : <ul className="players">{players}</ul>
  );
}

Players.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
  })).isRequired
}