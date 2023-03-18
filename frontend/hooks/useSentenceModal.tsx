import axios from "axios";
import { FC, SetStateAction, Dispatch, useCallback, useState } from "react";
import { WordScheme } from "../components/atoms/Word";
import { DocumentScheme } from "../pages/document/[documentId]";

type Props = {
  functions: {
    setWordSchemes: Dispatch<SetStateAction<WordScheme[]>>;
    setDocument: Dispatch<SetStateAction<DocumentScheme>>;
  };
};

export type UseModal = [
  SentenceModal: FC,
  open: () => void,
  isOpenModal: boolean
];

export const useSentenceModal = (props: Props): UseModal => {
  /** テキスト入力処理 */
  const handleBlurTextArea = async (event) => {
    const inputText: string = event.target.value;
    const availableText = inputText.replace(/\r\n|\n|\r/, "");
    //TODO: add validation

    // 翻訳語のテキスト
    let translation = "";
    // Deeplから翻訳結果を取得
    const params = new URLSearchParams();
    params.append("text", availableText);
    // TODO:fix it to be able to select target_lang.
    params.append("target_lang", "JA");

    await axios
      .post("http://localhost:3000/translation", params)
      .then((res) => {
        console.log("translation res at front", res.data);
        translation =
          res.data.translations.length > 0 ? res.data.translations[0].text : "";
      })
      .catch((err) => {
        console.log("error in translation request", err);
      });

    props.functions.setDocument((prev) => ({
      ...prev,
      sentence: availableText,
      translation,
    }));
    props.functions.setWordSchemes(
      availableText
        .split(" ")
        .map((word, index) => ({ word, index, mark: "", isVisible: true }))
    );
  };
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const open = useCallback(() => {
    setIsOpenModal(true);
  }, [setIsOpenModal]);
  const close = useCallback(() => {
    setIsOpenModal(false);
  }, [setIsOpenModal]);

  const SentenceModal: FC = useCallback(() => {
    return (
      <div className="relative flex flex-col w-[100vw] h-[100vh] bg-gray-300 z-[999] px-10 py-16">
        <div className="flex justify-end">
          <button className="rounded p-8" onClick={close}>
            ×
          </button>
        </div>
        <textarea
          className="input-sentence text-[16px] leading-4 p-8 border border-solid border-blue-600 rounded-[4px]"
          onBlur={handleBlurTextArea}
          placeholder="Type here..."
        ></textarea>
        <div className="flex justify-end">
          <button
            className="w-20 rounded bg-green-500 text-white py-3"
            onClick={close}
          >
            <span className="text-[14px] leading-5">OK</span>
          </button>
        </div>
      </div>
    );
  }, []);
  return [SentenceModal, open, isOpenModal];
};
