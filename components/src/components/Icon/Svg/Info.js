import Icon from "../Icon";

export const Info = (props) => {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="18" x2="12" y2="10" />
      <line x1="12" y1="6" x2="12" y2="8" />
    </Icon>
  );
};

export default Info;
