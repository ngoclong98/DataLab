// @ts-ignore
// @ts-nocheck
import React from "react";
const CustomDropdownToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </div>
));

export default CustomDropdownToggle;
