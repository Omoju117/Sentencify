import { VFC, useState, SetStateAction, Dispatch, useContext } from "react";
import { MarkContext } from "../../pages/_app";

/** Type of Word */
export type WordScheme = {
  index: number;
  word: string;
  mark: string;
  isVisible: boolean;
};

type Props = {
  index: number;
  word: string;
  isVisible: boolean;
  setWordSchemes: Dispatch<SetStateAction<WordScheme[]>>;
};

const getBgStyle = (mark: string) => {
  switch (mark) {
    case "show":
      return "bg-orange-300";
    case "note":
      return "bg-purple-300";
    case "":
    default:
      return "bg-gray-100";
  }
};

const Word: VFC<Props> = ({ index, word, isVisible, setWordSchemes }) => {
  // コンテキストから値を取得
  const mark = useContext(MarkContext);
  const [bgColor, setBgColor] = useState("bg-gray-100");
  const onClickHandler = () => {
    // wordのステータスを更新
    setWordSchemes((prev) => {
      const newArray = [...prev];
      newArray.splice(index, 1, { index, word, mark, isVisible });
      return newArray;
    });
    setBgColor(getBgStyle(mark));
    console.log("mark", mark);
    console.log("style", getBgStyle(mark));
  };
  return (
    <button
      className={
        bgColor +
        (isVisible ? "" : " invisible") +
        " flex h-12 p-2 rounded-[4px] cursor-pointer"
      }
      onClick={onClickHandler}
    >
      <span className="w-full text-[24px] leading-6">{word}</span>
    </button>
  );
};

export default Word;
