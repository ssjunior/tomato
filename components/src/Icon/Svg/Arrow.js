import Icon from "../Icon";

const RenderIcon = (props) => {
  return (
    <Icon {...props}>
      <line x1="12" y1="19" x2="12" y2="5"></line>
      <polyline points="5 12 12 5 19 12"></polyline>
    </Icon>
  );
};

export default RenderIcon;
