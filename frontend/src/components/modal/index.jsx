import React from "react";

import { default as ModalMaterial } from "@material-ui/core/Modal";
import { Button, Icon } from "@material-ui/core";

const Modal = props => {
  const { children, size, open, onClose } = props;
  return (
    <ModalMaterial open={open}>
      <div
        style={{
          height: `${size}vh`,
          width: `${size}vw`,
          marginTop: `${(100 - size) / 2}vh`,
          marginLeft: `${(100 - size) / 2}vw`,
          backgroundColor: "white"
        }}
      >
        <div
          style={{
            height: "7%"
          }}
        >
          <div
            style={{
              float: "right"
            }}
          >
            <Button onClick={onClose}>
              <Icon>close</Icon>
            </Button>
          </div>
        </div>
        <div
          style={{
            height: "93%",
            width: "100%",
            overflow: "scroll"
          }}
        >
          {children}
        </div>
      </div>
    </ModalMaterial>
  );
};

export default Modal;
