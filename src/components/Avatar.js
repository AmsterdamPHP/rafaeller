import PropTypes from "prop-types";
import DOMPurify from "dompurify";

export default function Avatar(props)
{
  const svg = DOMPurify.sanitize(props.svg, {
    USE_PROFILES: { svg: true },
  });

  const className = props.className

  return(
      <div
        className={`avatar ${className && className}`}
        dangerouslySetInnerHTML={{__html: svg}}
      />
    )
}

Avatar.propTypes = {
  svg: PropTypes.string.isRequired
}