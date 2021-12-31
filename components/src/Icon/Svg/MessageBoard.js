import Icon from "../Icon";

const RenderIcon = (props) => {
  return (
    <Icon {...props}>
      <path
        d="M19 4.236C19 3.002 17.864 2 16.465 2H4.535C3.136 2 2 3.002 2 4.236v10.528C2 15.998 3.136 17 4.535 17h11.93C17.864 17 19 15.998 19 14.764V4.236z"
        transform="matrix(1.17647 0 0 1.33333 -.353 -.667)"
      />
      <path d="M6.5 18h11M6.5 6h11M6.5 9h11M6.5 12h11M6.5 15h11" />
    </Icon>
  );
};

export default RenderIcon;
