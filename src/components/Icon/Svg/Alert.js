import Icon from "../Icon";

const RenderIcon = (props) => {
  return (
    <Icon {...props}>
      <path d="M16,4h2c1.105,0,2,0.895,2,2v14c0,1.105-0.895,2-2,2H6c-1.105,0-2-0.895-2-2V6c0-1.105,0.895-2,2-2h2" />
      <path d="M9,2h6c0.552,0,1,0.448,1,1v2c0,0.552-0.448,1-1,1H9C8.448,6,8,5.552,8,5V3C8,2.448,8.448,2,9,2z" />
    </Icon>
  );
};

export default RenderIcon;
