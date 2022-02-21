// import PopupConfirm from "../PopupConfirm";

// const GlobalPopupConfirm = () => {
//   return <div />;
// };

// export default GlobalPopupConfirm;

import React, { useState, useImperativeHandle } from "react";
import PopupConfirm, { PopupConfirmProps } from "../PopupConfirm";
export type { PopupConfirmProps } from "../PopupConfirm";

export interface GlobalPopupConfirmRef {
  open: (data: PopupConfirmProps) => void;
  close: () => void;
}

const GlobalPopupConfirm = React.forwardRef((props, ref) => {
  const [popupData, setPopupData] = useState<PopupConfirmProps>({
    visible: false,
  });

  useImperativeHandle(ref, () => ({
    open: (data: PopupConfirmProps) => {
      setPopupData({ ...data, visible: true });
    },
    close: () => {
      setPopupData({ visible: false, title: undefined, content: undefined });
    },
  }));

  return <PopupConfirm {...popupData} />;
});

export default GlobalPopupConfirm;
