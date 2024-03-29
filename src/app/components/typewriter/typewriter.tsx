"use client"
import { useState, useRef, useEffect, useCallback } from "react";
type Props = {
  phrases: string[]
  className?: string
}

export default function TypeWriter(props: Props) {
  const [rotationText, setRotationText] = useState<string>("");

  const rotationInterval = useRef<NodeJS.Timeout | null>(null);

  const rotateText = useCallback(() => {
    setRotationText((prevText) => {
      setRotationText(prevText);
      const currentIndex = props.phrases.indexOf(prevText);
      const nextIndex = (currentIndex + 1) % props.phrases.length;
      const nextText = props.phrases[nextIndex];

      let commonPrefix = "";
      let i = 0;
      while (prevText[i] === nextText[i]) {
        commonPrefix += prevText[i];
        i++;
      }

      let newText = commonPrefix;
      let delay = 1000;
      for (let j = prevText.length; j > commonPrefix.length; j--) {
        setTimeout(() => {
          setRotationText(prevText.substring(0, j - 1));
        }, delay);
        delay += 100;
      }

      delay += 1000;
      for (let k = commonPrefix.length; k < nextText.length; k++) {
        setTimeout(() => {
          setRotationText(nextText.substring(0, k + 1));
        }, delay);
        delay += 100;
      }
      return newText;
    });
  }, [props.phrases]);

  useEffect(() => {
    rotationInterval.current = setInterval(rotateText, 5000);

    return () => {
      if (rotationInterval.current) clearInterval(rotationInterval.current);
    };
  }, [rotateText]);

  return <span className={`${props.className || ""}`}> {rotationText} </span>
}
