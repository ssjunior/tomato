import Icon from "../Icon";

const RenderIcon = (props) => {
  return (
    <Icon {...props}>
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </Icon>
  );
};

export default RenderIcon;
