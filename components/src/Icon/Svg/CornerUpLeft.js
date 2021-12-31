import Icon from "../Icon";

const RenderIcon = (props) => {
  return (
    <Icon {...props}>
      <polyline points="9 14 4 9 9 4"></polyline>
      <path d="M20 20v-7a4 4 0 0 0-4-4H4"></path>
    </Icon>
  );
};

export default RenderIcon;
