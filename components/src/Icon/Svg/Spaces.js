import Icon from "../Icon";

const RenderIcon = (props) => {
  return (
    <Icon {...props}>
      <path d="M12,6.5h4.3c0.7,0,1.2,0.5,1.2,1.2v8.6c0,0.7-0.5,1.2-1.2,1.2H12 M12,6.5H7.7C7,6.5,6.5,7,6.5,7.7v8.6c0,0.7,0.5,1.2,1.2,1.2H12" />
      <path d="M16.7,2.3h2.7c1.2,0,2.1,1,2.1,2.1v2.7" />
      <path d="M21.5,16.9v2.7c0,1.2-1,2.1-2.1,2.1h-2.7" />
      <path d="M7.3,21.7H4.7c-1.2,0-2.1-1-2.1-2.1v-2.7" />
      <path d="M2.5,7.1V4.4c0-1.2,1-2.1,2.1-2.1h2.7" />
    </Icon>
  );
};

export default RenderIcon;
