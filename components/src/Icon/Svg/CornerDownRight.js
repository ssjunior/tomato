import Icon from "../Icon";

const RenderIcon = (props) => {
  return (
    <Icon {...props}>
      <polyline points="15 10 20 15 15 20"></polyline>
      <path d="M4 4v7a4 4 0 0 0 4 4h12"></path>
    </Icon>
  );
};

export default RenderIcon;
