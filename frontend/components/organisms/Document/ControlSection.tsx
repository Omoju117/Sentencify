import { VFC, useState, useEffect, SetStateAction, Dispatch } from "react";
import MarkPicker from "../../atoms/MarkPicker";
import Word, { WordScheme } from "../../atoms/Word";
import { MarkContext } from "../../../pages/_app";
import { DocumentScheme } from "../../../pages/document/[documentId]";

type Props = {
  states: {
    wordSchemes: WordScheme[];
  };
  functions: {
    setDocument: Dispatch<SetStateAction<DocumentScheme>>;
    setWordSchemes: Dispatch<SetStateAction<WordScheme[]>>;
    handleClickSave: (e: any) => void;
  };
};

const ControlSection: VFC<Props> = ({ states, functions }) => {
  const [mark, setMark] = useState("");
  useEffect(() => {
    console.log(states.wordSchemes);
  }, [states.wordSchemes]);

  const handleBlurTextArea = (event) => {
    const inputValue: string = event.target.value;
    functions.setDocument((prev) => ({ ...prev, sentence: inputValue }));
    functions.setWordSchemes(
      inputValue
        .split(" ")
        .map((word, index) => ({ word, index, mark: "", isVisible: true }))
    );
  };
  return (
    <div className="flex flex-col w-[70%] pr-2">
      <div className="flex mb-5">
        <textarea
          className="input-sentence w-full text-[16px] leading-4 p-8 border border-solid border-blue-600 rounded-[4px]"
          onBlur={handleBlurTextArea}
          placeholder="Type here..."
        ></textarea>
      </div>
      <MarkContext.Provider value={mark}>
        <div className="flex flex-wrap space-x-6 p-4 items-center justify-start h-[60vw]">
          {states.wordSchemes.map((wordStatus, i) => (
            <Word
              key={i + wordStatus.word}
              index={i}
              word={wordStatus.word}
              mark={wordStatus.mark}
              isVisible={wordStatus.isVisible}
              setWordSchemes={functions.setWordSchemes}
            />
          ))}
        </div>
        <div className="flex">
          <MarkPicker markType={"show"} setMark={setMark} />
          <MarkPicker markType={"note"} setMark={setMark} />
          <button
            className="w-[55%] border rounded"
            onClick={functions.handleClickSave}
          >
            save
          </button>
          <button
            className="w-[7.5%] bg-gray-200 rounded"
            onClick={() => {
              functions.setWordSchemes(() =>
                states.wordSchemes.map((wordScheme) => ({
                  ...wordScheme,
                  isVisible: wordScheme.mark === "show",
                }))
              );
            }}
          >
            hide
          </button>
          <button
            className="w-[7.5%] bg-gray-600 rounded"
            onClick={() => {
              functions.setWordSchemes(() =>
                states.wordSchemes.map((wordScheme) => ({
                  ...wordScheme,
                  isVisible: true,
                }))
              );
            }}
          >
            reset
          </button>
        </div>
      </MarkContext.Provider>
    </div>
  );
};

export default ControlSection;
