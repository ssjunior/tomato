import Icon from "../Icon";

const RenderIcon = (props) => {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="7" x2="12" y2="13"></line>
      <line x1="12" y1="16" x2="12.01" y2="18"></line>
    </Icon>
  );
};

export default RenderIcon;
