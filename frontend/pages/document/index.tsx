import axios from "axios";
import { VFC, useState } from "react";
import { WordScheme } from "../../components/atoms/Word";
import ControlSection from "../../components/organisms/Document/ControlSection";
import NoteSection from "../../components/organisms/Document/NoteSection";

type DocumentScheme = {
  id?: number;
  sentence: string;
  translation: string;
  markedWords: WordScheme[];
};

const Document: VFC<void> = () => {
  /** 英文 */
  const [sentence, setSentence] = useState("");
  /** 訳 */
  const [translation, setTranslation] = useState("");
  /** 英文を構成するWordの配列データ */
  const [wordSchemes, setWordSchemes] = useState<WordScheme[]>([]);
  /** Documentのデータ */
  const documentScheme: DocumentScheme = {
    id: 1,
    sentence,
    translation,
    markedWords: wordSchemes.filter((wordScheme) => wordScheme.mark !== ""),
  };

  const handleClickSave = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.append("id", documentScheme.id.toString());
    params.append("sentence", documentScheme.sentence);
    params.append("translation", documentScheme.translation);
    documentScheme.markedWords.forEach((word) => {
      params.append("markedWords", JSON.stringify(word));
    });

    axios
      .post("http://localhost:3000/document", params)
      .then((res) => {
        console.log("res", res.data);
      })
      .catch((err) => {
        console.log("error in request", err);
      });
  };

  return (
    <div className="flex w-[100vw] h-[100vh] px-10 py-20">
      <ControlSection
        states={{ wordSchemes }}
        functions={{ setSentence, setWordSchemes, handleClickSave }}
      />
      <NoteSection functions={{ setTranslation }} />
    </div>
  );
};

export default Document;
