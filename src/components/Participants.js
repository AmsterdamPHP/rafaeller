import React from "react";
import PropTypes from "prop-types";
import Loading from "./Loading";

export default function Participants(props) {
  const participants = props.participants.map((participant) =>
    <li>
      {participant.imageUrl}
      {participant.name}
    </li>
  );
  return (
    participants.length === 0
      ? <Loading message="no-one here yet... :(" />
      : <ul className="participants">{participants}</ul>
  );
}

Participants.propTypes = {
  participants: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired
  })).isRequired
}