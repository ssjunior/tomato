import Icon from "../Icon";

const RenderIcon = (props) => {
  return (
    <Icon {...props}>
      <line x1="21" y1="4" x2="3" y2="4"></line>
      <line x1="21" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="20" x2="3" y2="20"></line>
    </Icon>
  );
};

export default RenderIcon;
