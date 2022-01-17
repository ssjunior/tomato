import Icon from "../Icon";

const RenderIcon = (props) => {
  return (
    <Icon {...props}>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
      <line x1="3" y1="14" x2="21" y2="14"></line>
      <line x1="3" y1="18" x2="17" y2="18"></line>
    </Icon>
  );
};

export default RenderIcon;
