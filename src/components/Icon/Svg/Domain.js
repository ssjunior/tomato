import Icon from "../Icon";

const RenderIcon = (props) => {
  return (
    <Icon {...props}>
      <path d="M17.64,19.619c-1.678,1.274-3.771,2.03-6.041,2.03c-5.523,0-10-4.477-10-10s4.477-10,10-10s10,4.477,10,10    c0,2.245-0.74,4.318-1.989,5.987" />
      <line x1="1.599" y1="11.649" x2="21.599" y2="11.649" />
      <path d="M11.599,1.649c2.501,2.738,3.923,6.292,4,10c-0.077,3.708-1.499,7.262-4,10c-2.501-2.738-3.923-6.292-4-10    C7.676,7.941,9.098,4.388,11.599,1.649z" />
      <polygon points="16.943,16.642 18.516,22.476 19.564,19.854 22.776,19.395  " />
    </Icon>
  );
};

export default RenderIcon;