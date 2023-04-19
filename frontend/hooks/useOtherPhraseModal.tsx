import { useRouter } from "next/router";
import { Dispatch, FC, SetStateAction, useCallback, useState } from "react";
import { axiosInstance } from "../apis/api";

type Props = {
  functions: {
    setFetchSignal: Dispatch<SetStateAction<string[]>>;
  };
};
export type UseOtherPhraseModal = [
  OtherPhraseModal: FC,
  setOtherPhrase: Dispatch<SetStateAction<WordOfOtherPhrase[]>>,
  open: () => void,
  isOpenModal: boolean
];
export type WordOfOtherPhrase = {
  index: number;
  word: string;
};

export const useOtherPhraseModal = (props: Props): UseOtherPhraseModal => {
  const router = useRouter();
  const [otherPhrase, setOtherPhrase] = useState<WordOfOtherPhrase[]>([]);
  const [generatedPhrase, setGeneratedPhrase] = useState<string>("");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const open = useCallback(() => {
    setIsOpenModal(true);
  }, [setIsOpenModal]);
  const close = useCallback(() => {
    setIsOpenModal(false);
    setOtherPhrase([]);
    setGeneratedPhrase("");
  }, [setIsOpenModal]);

  const getOtherPhrase = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.append(
      "phrase",
      otherPhrase.map((wordObj) => wordObj.word).join(" ")
    );

    await axiosInstance
      .put("/getOtherPhrase", params)
      .then((res) => {
        console.log("generated phrase: ", res.data);
        setGeneratedPhrase(res.data);
      })
      .catch((err) => {
        console.log("error in request: ", err);
      });
  };

  const createNewDocumentWithSentence = async () => {
    const params = new URLSearchParams();
    params.append("sentence", generatedPhrase);

    await axiosInstance
      .post("/document", params)
      .then((res) => {
        console.log("result: ", res.data);
        const document = res.data;
        router.push({
          pathname: `/document/${document.id}`,
          query: {
            isVisible: true,
            isExisting: true,
          },
        });
        props.functions.setFetchSignal((prev) => [...prev]);
        close();
      })
      .catch((err) => {
        console.log("error in request: ", err);
      });
  };

  // そのほかのフレーズ操作セクション
  const otherPhraseSection = (
    <div className="flex flex-col items-center justify-center rounded bg-white p-4">
      <div className="flex justify-center text-[16px] leading-4 mt-10 mb-4 space-x-2 h-[72px]">
        {otherPhrase.map((word) => {
          return (
            <div
              key={word.word + word.index}
              className="bg-[#ffa54c] h-[40px] p-3 rounded-[4px] cursor-pointer"
            >
              <span>{word.word}</span>
            </div>
          );
        })}
      </div>
      <div className="w-full flex justify-center items-center">
        <button
          className="rounded w-[35%] bg-[#e22222] text-white p-3"
          onClick={getOtherPhrase}
        >
          <span className="text-[20px] leading-[16px]">Generate</span>
        </button>
        <button
          className="rounded w-[10%] bg-gray-200 p-3"
          onClick={() => {
            setOtherPhrase([]);
          }}
        >
          <span>c</span>
        </button>
      </div>
    </div>
  );

  // 生成されたフレーズセクション
  const generatedPhraseSection = (
    <div className="w-full flex flex-col h-[200px] items-center justify-center text-[20px] leading-[24px] mt-10 rounded bg-[#ffffff] p-3">
      <div className="w-full justify-start">
        <p className="text-orange-400 font-bold w-[25%] text-[14px] leading-[16px] mt-2 mb-4">
          generated!
        </p>
      </div>
      <p className="text-center">{generatedPhrase}</p>
      <button
        className="bg-green-500 text-white p-3 rounded mt-6"
        onClick={createNewDocumentWithSentence}
      >
        new document
      </button>
    </div>
  );

  const OtherPhraseModal: FC = useCallback(() => {
    return (
      <div className="absolute flex justify-center w-[27vw] h-[100vh] z-[999] left-[73%]">
        <div className="flex flex-col w-full px-4">
          <div className="flex justify-end">
            <button className="rounded p-8" onClick={close}>
              ×
            </button>
          </div>
          {/* ====== display below after generating phrase ====== */}
          {generatedPhrase ? generatedPhraseSection : otherPhraseSection}
        </div>
        <div className="absolute w-full h-full bg-gray-100 z-[-1]"></div>
      </div>
    );
  }, [otherPhrase, generatedPhrase]);
  return [OtherPhraseModal, setOtherPhrase, open, isOpenModal];
};
