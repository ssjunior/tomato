import Icon from "../Icon";

const RenderIcon = (props) => {
  return (
    <Icon {...props}>
      <rect x="6" y="4" width="4" height="16"></rect>
      <rect x="14" y="4" width="4" height="16"></rect>
    </Icon>
  );
};

export default RenderIcon;
