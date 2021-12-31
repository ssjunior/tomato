import Icon from "../Icon";

const RenderIcon = (props) => {
  const style = {
    style: {
      strokeWidth: "2px",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
  };

  return (
    <Icon {...style} {...props}>
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
    </Icon>
  );
};

export default RenderIcon;
