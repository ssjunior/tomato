import { createPortal } from "react-dom";

export const Portal = ({ children, id }) => {
  let portal = document.getElementById(id);

  if (!portal) {
    portal = document.createElement("div");
    portal.setAttribute("id", id);
    portal.setAttribute("height", "100%");
    portal.setAttribute("width", "100%");
    portal.setAttribute("overflow", "auto");
    document.body.appendChild(portal);
  }

  return createPortal(children, portal);
};
