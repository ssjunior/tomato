import Icon from "../Icon";

const RenderIcon = (props) => {
  return (
    <Icon {...props}>
      <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"></path>
      <line x1="4" y1="21" x2="20" y2="21"></line>
    </Icon>
  );
};

export default RenderIcon;
