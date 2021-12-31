import Icon from "../Icon";

const RenderIcon = (props) => {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
      <line x1="11.5" y1="17" x2="13.5" y2="17"></line>
    </Icon>
  );
};

export default RenderIcon;
