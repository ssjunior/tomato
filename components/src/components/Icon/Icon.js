import styled from "@emotion/styled";

import { SIZES } from "../../constants";

const SVG = styled("svg")`
  width: 18px;
  min-width: 18px;
  height: 18px;
  min-height: 18px;
  ${(props) => props.stroke && `stroke: ${props.theme.colors[props.stroke]};`}
  ${(props) =>
    props.height && `height: ${props.height}; min-height: ${props.height};`}
  ${(props) =>
    props.width && `width: ${props.width}; min-width: ${props.width};`} 
  ${(props) => {
    if (!props.size || typeof props.size === "undefined") return "";
    if (Object.keys(SIZES).includes(props.size))
      return `width: ${SIZES[props.size].size}; min-width: ${
        SIZES[props.size].size
      }; height: ${SIZES[props.size].size}; min-height: ${
        SIZES[props.size].size
      };`;
    return `width: ${props.size}; min-width: ${props.size}; height: ${props.size}; min-height: ${props.size};`;
  }}                               

  box-sizing: border-box;
  stroke-width: 2px;
`;

export const Icon = ({ children, ...props }) => {
  return (
    <SVG xmlns="http://www.w3.org/2000/svg" {...props}>
      {children}
    </SVG>
  );
};

Icon.defaultProps = {
  fill: "none",
  stroke: "black",
  viewBox: "0 0 23 23",
};

export default Icon;
