import styled from "@emotion/styled";
import Tippy from "@tippyjs/react";

// import "tippy.js/dist/tippy.css";
// import "tippy.js/themes/light.css";

export const Tooltip = styled(Tippy);

Tooltip.defaultProps = {
  zIndex: 99999,
};
