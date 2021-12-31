import Icon from "../Icon";

const RenderIcon = (props) => {
  return (
    <Icon {...props}>
      <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
      <polyline points="2 17 12 22 22 17"></polyline>
      <polyline points="2 12 12 17 22 12"></polyline>
    </Icon>
  );
};

export default RenderIcon;
