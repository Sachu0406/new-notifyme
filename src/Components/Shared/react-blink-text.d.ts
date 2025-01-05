declare module "react-blink-text" {
  import React from "react";

  interface BlinkProps {
    color?: string;
    text?: string;
    interval?: number;
    fontSize?: string;
  }

  const Blink: React.FC<BlinkProps>;

  export default Blink;
}
