import Icon from "../Icon";

const RenderIcon = (props) => {
  return (
    <Icon {...props}>
      <circle cx="13.45" cy="13.5" r="5.6" />
      <line x1="22.05" y1="22.1" x2="17.65" y2="17.7" />
      <path d="M5.55,12.8h-1.9c-0.9,0-1.7-0.7-1.7-1.7V3.6c0-0.9,0.7-1.7,1.7-1.7h7.5c0.9,0,1.7,0.7,1.7,1.7v1.8" />
    </Icon>
  );
};

export default RenderIcon;
