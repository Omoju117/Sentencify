import { VFC, useState, useEffect, SetStateAction, Dispatch } from "react";
import MarkPicker from "../../atoms/MarkPicker";
import Word, { WordScheme } from "../../atoms/Word";
import { MarkContext } from "../../../pages/_app";
import { DocumentScheme } from "../../../pages/document/[documentId]";
import Image from "next/image";

type Props = {
  states: {
    documentScheme: DocumentScheme;
    wordSchemes: WordScheme[];
  };
  functions: {
    setWordSchemes: Dispatch<SetStateAction<WordScheme[]>>;
    handleClickSave: (e: any) => void;
  };
};

const ControlSection: VFC<Props> = ({ states, functions }) => {
  /** 現在選択されているマーク */
  const [mark, setMark] = useState("");
  /** Wordsの可視状態 */
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    console.log(states.wordSchemes);
  }, [states.wordSchemes]);

  const handleClickPlaySound = () => {
    const base64ToBlobUrl = (base64) => {
      const bin = atob(base64.replace(/^.*,/, ""));
      const buffer = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) {
        buffer[i] = bin.charCodeAt(i);
      }
      return window.URL.createObjectURL(
        new Blob([buffer.buffer], { type: "audio/wav" })
      );
    };
    // TODO: fix it to get from env
    const url =
      "https://texttospeech.googleapis.com/v1/text:synthesize?key=" + "";
    const data = {
      input: {
        text: states.documentScheme.sentence,
      },
      voice: {
        languageCode: "en-US",
        name: "en-US-Neural2-J",
      },
      audioConfig: {
        audioEncoding: "MP3",
        speaking_rate: "1.00",
        pitch: "0.00",
      },
    };
    const params = {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
      method: "POST",
    };
    fetch(url, params)
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        try {
          var blobUrl = base64ToBlobUrl(res.audioContent);
          var audio = new Audio();
          audio.src = blobUrl;
          audio.play();
        } catch (e) {
          console.log(e);
        }
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="flex flex-col w-[70%] pr-2">
      <MarkContext.Provider value={mark}>
        <div className="flex flex-wrap space-x-6 p-4 items-center justify-start h-[40vw]">
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
          <MarkPicker functions={{ setMark }} />
          <button
            className="w-[70%] border rounded"
            onClick={functions.handleClickSave}
          >
            save
          </button>
          {isVisible ? (
            <button
              className="w-[10%] bg-gray-200 rounded"
              onClick={() => {
                functions.setWordSchemes(() =>
                  states.wordSchemes.map((wordScheme) => ({
                    ...wordScheme,
                    isVisible: wordScheme.mark === "show",
                  }))
                );
                setIsVisible(false);
              }}
            >
              <Image
                src="/img/close-eye.svg"
                width="40px"
                height="40px"
                alt="close-eye"
              />
            </button>
          ) : (
            <button
              className="w-[10%] bg-gray-200 rounded"
              onClick={() => {
                functions.setWordSchemes(() =>
                  states.wordSchemes.map((wordScheme) => ({
                    ...wordScheme,
                    isVisible: true,
                  }))
                );
                setIsVisible(true);
              }}
            >
              <Image
                src="/img/open-eye.svg"
                width="40px"
                height="40px"
                alt="open-eye"
              />
            </button>
          )}
          <button
            className="w-[10%] bg-gray-200 rounded"
            onClick={handleClickPlaySound}
          >
            <Image
              src="/img/play-sound.svg"
              width="40px"
              height="40px"
              alt="play-sound"
            />
          </button>
        </div>
      </MarkContext.Provider>
    </div>
  );
};

export default ControlSection;
