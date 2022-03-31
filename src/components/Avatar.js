import PropTypes from "prop-types";

export default function Avatar(props)
{
  return(
      <div
        className="avatar"
        dangerouslySetInnerHTML={{__html: props.svg}}
      />
    )
}

Avatar.propTypes = {
  svg: PropTypes.string.isRequired
}