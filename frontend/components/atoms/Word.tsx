import {
  VFC,
  useState,
  SetStateAction,
  Dispatch,
  useContext,
  useEffect,
} from "react";
import { WordOfOtherPhrase } from "../../hooks/useOtherPhraseModal";
import { MarkContext } from "../../pages/_app";
import { getMarkColorStyle } from "../../utils/colorUtil";

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
  states: {
    isOpenOtherPhraseModal: boolean;
  };
  functions: {
    setWordSchemes: Dispatch<SetStateAction<WordScheme[]>>;
    setOtherPhrase: Dispatch<SetStateAction<WordOfOtherPhrase[]>>;
  };
};

const Word: VFC<Props> = ({
  index,
  word,
  mark,
  isVisible,
  states,
  functions,
}) => {
  // コンテキストから値を取得
  const currentPickedMark = useContext(MarkContext);
  const [bgColor, setBgColor] = useState("bg-gray-100");

  /** 初回レンダリング時処理 */
  useEffect(() => {
    setBgColor(getMarkColorStyle(mark));
  }, [mark]);

  /** Wordクリック時処理 */
  const onClickHandler = () => {
    // wordのステータスを更新
    functions.setWordSchemes((prev) => {
      const newArray = [...prev];
      newArray.splice(index, 1, {
        index,
        word,
        mark: currentPickedMark,
        isVisible,
      });
      return newArray;
    });
    setBgColor(getMarkColorStyle(currentPickedMark));
    console.log("mark", currentPickedMark);
    console.log("style", getMarkColorStyle(currentPickedMark));
  };

  const onClickWhenOpenOtherPhraseModal = (e) => {
    e.preventDefault();
    functions.setOtherPhrase((prev) => [...prev, { index, word }]);
  };
  return (
    <div className="border-b border-gray-300">
      <button
        className={
          bgColor +
          (isVisible ? "" : " invisible") +
          " p-2 rounded-[4px] cursor-pointer"
        }
        onClick={
          states.isOpenOtherPhraseModal
            ? onClickWhenOpenOtherPhraseModal
            : onClickHandler
        }
      >
        <span className="w-full text-[16px] leading-5">{word}</span>
      </button>
    </div>
  );
};

export default Word;
