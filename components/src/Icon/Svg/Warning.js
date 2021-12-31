import Icon from "../Icon";

export const Warning = (props) => {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="6" x2="12" y2="14" />
      <line x1="12" y1="16" x2="12" y2="18" />
    </Icon>
  );
};

export default Warning;
