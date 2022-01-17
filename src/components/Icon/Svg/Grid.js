import Icon from "../Icon";

const RenderIcon = (props) => {
  return (
    <Icon {...props}>
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
    </Icon>
  );
};

export default RenderIcon;
