import PropTypes from "prop-types"
import React from "react"

export default function JoinCode(props) {
  return (
    <p>
      Go to <strong>{props.url}</strong> and enter <strong>{props.code}</strong> to join!<br />
      <span className="small">(or scan the QR code)</span>
    </p>
  )
}

JoinCode.propTypes = {
  url: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
}