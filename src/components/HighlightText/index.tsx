import { REPLACE_IDENTIFIER } from "../../Constants";

interface HighlightTextProps {
  text: string;
  replaceText: Array<string>;
  className: string;
  highlightClassName: string;
}

const HighlightText = ({
  text,
  replaceText,
  className,
  highlightClassName,
}: HighlightTextProps) => {
  const splitTextArr = text.split(REPLACE_IDENTIFIER);
  console.log("Split arr", splitTextArr);
  const textSpanArr: any[] = [];
  for (let i = 0; i < splitTextArr.length; i++) {
    textSpanArr.push(
      <span key={`${i}_not_hightlight`}>{splitTextArr[i]}</span>
    );
    if (i < splitTextArr.length - 1) {
      textSpanArr.push(
        <span className={highlightClassName} key={`${i}_hightlight`}>
          {replaceText[i]}
        </span>
      );
    }
  }

  return <span className={className}>{textSpanArr}</span>;
};

export default HighlightText;
