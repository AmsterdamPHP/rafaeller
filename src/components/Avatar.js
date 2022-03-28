export default function Avatar(props)
{
  console.log('hi')
  return(
      <div
        className="avatar"
        dangerouslySetInnerHTML={{__html: props.svg}}
      />
    )
}