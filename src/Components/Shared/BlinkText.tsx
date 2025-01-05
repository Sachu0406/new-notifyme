import React from "react";
import Blink from "react-blink-text";

interface BlinkingTextProps {
  text: string;
  interval?: number;
}

const BlinkingText: React.FC<BlinkingTextProps> = ({
  text,
  interval = 1000,
}) => {
  return (
    <div>
      <Blink color="red" text={text} interval={interval} fontSize="15px" />
    </div>
  );
};

export default BlinkingText;
