import Icon from "../Icon";

const RenderIcon = (props) => {
  return (
    <Icon {...props}>
      <polyline points="4,7 4,4 20,4 20,7 " />
      <line x1="9" y1="20" x2="15" y2="20" />
      <line x1="12" y1="4" x2="12" y2="20" />
      <line x1="1.9" y1="12" x2="22.1" y2="12" />
    </Icon>
  );
};

export default RenderIcon;
