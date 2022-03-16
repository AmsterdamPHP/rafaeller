import PropTypes from "prop-types"

export default function JoinCode(props) {
  return (
    <p>Go to {props.url} and enter <strong>{props.code}</strong> to join!</p>
  )
}

JoinCode.propTypes = {
  url: PropTypes.string.isRequired,
  code: PropTypes.number.isRequired,
}