import Icon from "../Icon";

const RenderIcon = (props) => {
  return (
    <Icon {...props}>
      <line x1="21" y1="6" x2="3" y2="6"></line>
      <line x1="21" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="18" x2="3" y2="18"></line>
    </Icon>
  );
};

export default RenderIcon;
