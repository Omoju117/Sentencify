import { Dispatch, FC, SetStateAction, useCallback, useState } from "react";
import { axiosInstance } from "../apis/api";

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

export const useOtherPhraseModal = (): UseOtherPhraseModal => {
  const [otherPhrase, setOtherPhrase] = useState<WordOfOtherPhrase[]>([]);
  const [generatedPhrase, setGeneratedPhrase] = useState<string>("");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const open = useCallback(() => {
    setIsOpenModal(true);
  }, [setIsOpenModal]);
  const close = useCallback(() => {
    setIsOpenModal(false);
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

  const OtherPhraseModal: FC = useCallback(() => {
    return (
      <div className="absolute flex justify-center w-[27vw] h-[100vh] z-[999] left-[73%]">
        <div className="flex flex-col w-full px-4">
          <div className="flex justify-end">
            <button className="rounded p-8" onClick={close}>
              ×
            </button>
          </div>
          <div className="flex justify-center text-[24px] leading-6 mt-10 mb-4 space-x-2 h-[72px]">
            {otherPhrase.map((word) => {
              return (
                <div
                  key={word.word + word.index}
                  className="bg-[#ffa54c] h-[50px] p-3 rounded-[4px] cursor-pointer"
                >
                  <span>{word.word}</span>
                </div>
              );
            })}
          </div>
          <div className="w-full flex justify-center items-center">
            <button
              className="rounded w-[35%] bg-[#ff4500] text-white p-3"
              onClick={getOtherPhrase}
            >
              <span className="text-[20px] leading-[16px]">Generate</span>
            </button>
            <button
              className="rounded w-[10%] bg-gray-400 p-3"
              onClick={() => {
                setOtherPhrase([]);
              }}
            >
              <span>c</span>
            </button>
          </div>
          {generatedPhrase ? (
            <div className="w-full flex h-[200px] items-center justify-center text-[20px] leading-[24px] mt-10 rounded bg-[#ffffff] p-3">
              <p className="text-center">{generatedPhrase}</p>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="absolute w-full h-full bg-[#faf0e6] z-[-1]"></div>
      </div>
    );
  }, [otherPhrase, generatedPhrase]);
  return [OtherPhraseModal, setOtherPhrase, open, isOpenModal];
};
