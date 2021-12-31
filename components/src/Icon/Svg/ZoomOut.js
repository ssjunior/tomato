import Icon from "../Icon";

const RenderIcon = (props) => {
  return (
    <Icon {...props}>
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      <line x1="8" y1="11" x2="14" y2="11"></line>
    </Icon>
  );
};

export default RenderIcon;
