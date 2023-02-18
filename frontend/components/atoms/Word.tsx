import {
  VFC,
  useState,
  SetStateAction,
  Dispatch,
  useContext,
  useEffect,
} from "react";
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
  mark: string;
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

const Word: VFC<Props> = ({ index, word, mark, isVisible, setWordSchemes }) => {
  // コンテキストから値を取得
  const currentPickedMark = useContext(MarkContext);
  const [bgColor, setBgColor] = useState("bg-gray-100");

  /** 初回レンダリング時処理 */
  useEffect(() => {
    setBgColor(getBgStyle(mark));
  }, [mark]);

  /** Wordクリック時処理 */
  const onClickHandler = () => {
    // wordのステータスを更新
    setWordSchemes((prev) => {
      const newArray = [...prev];
      newArray.splice(index, 1, {
        index,
        word,
        mark: currentPickedMark,
        isVisible,
      });
      return newArray;
    });
    setBgColor(getBgStyle(currentPickedMark));
    console.log("mark", currentPickedMark);
    console.log("style", getBgStyle(currentPickedMark));
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
