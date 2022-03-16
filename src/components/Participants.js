import React from "react";
import PropTypes from "prop-types";

export default function Participants(props) {
  const participants = props.participants.map((participant) =>
    <li>
      {participant.imageUrl}
      {participant.name}
    </li>
  );
  return (
    participants.length === 0
      ? <p>No-one here yet :(</p>
      : <ul className="participants">{participants}</ul>
  );
}

Participants.propTypes = {
  participants: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired
  })).isRequired
}