import Icon from "../Icon";

const RenderIcon = (props) => {
  return (
    <Icon {...props}>
      <line x1="21" y1="8" x2="3" y2="8"></line>
      <line x1="21" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="16" x2="3" y2="16"></line>
    </Icon>
  );
};

export default RenderIcon;
