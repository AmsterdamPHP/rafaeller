export default function Avatar(props)
{
  return(
      <div
        className="avatar"
        dangerouslySetInnerHTML={{__html: props.svg}}
      />
    )
}