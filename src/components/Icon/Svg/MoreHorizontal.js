import Icon from "../Icon";

const RenderIcon = (props) => {
  return (
    <Icon {...props}>
      <circle cx="6" cy="12" r="1" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="18" cy="12" r="1" />
    </Icon>
  );
};

export default RenderIcon;
