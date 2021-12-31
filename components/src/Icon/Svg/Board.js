import Icon from "../Icon";

const RenderIcon = (props) => {
  return (
    <Icon {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="3" y1="8" x2="21" y2="8"></line>
      <line x1="9" y1="3" x2="9" y2="21"></line>
      <line x1="15" y1="3" x2="15" y2="21"></line>
    </Icon>
  );
};

export default RenderIcon;
