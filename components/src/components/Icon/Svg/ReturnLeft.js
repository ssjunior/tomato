import Icon from "../Icon";

const RenderIcon = (props) => {
  return (
    <Icon {...props}>
      <path
        strokeWidth="2"
        strokeLinecap="round"
        d="M20.3,5.9v5.4c0,1.1-0.9,1.9-1.9,1.9H3.7"
      />
      <polyline
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points="7.8,17.4    3.7,13.2 7.8,9.1  "
      />
    </Icon>
  );
};

export default RenderIcon;
