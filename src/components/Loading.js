import PropTypes from "prop-types";

export default function Loading(props) {
  return (
    <span className="loader">
      {props.message}
    </span>
  )
}

Loading.propTypes = {
  message: PropTypes.string
}

Loading.defaultProps = {
  message: "Loading"
}