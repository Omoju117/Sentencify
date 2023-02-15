import axios from "axios";
import { useRouter } from "next/router";
import { VFC, useState } from "react";
import { WordScheme } from "../../components/atoms/Word";
import ControlSection from "../../components/organisms/Document/ControlSection";
import NoteSection from "../../components/organisms/Document/NoteSection";

type MarkScheme = {
  index: number;
  type: string;
};

// TODO: Add User ID
type DocumentScheme = {
  id?: number;
  sentence: string;
  translation: string;
  marks: MarkScheme[];
};

const Document: VFC<void> = () => {
  const router = useRouter();
  const [sentence, setSentence] = useState("");
  /** 訳 */
  const [translation, setTranslation] = useState("");
  /** 英文を構成するWordの配列データ */
  const [wordSchemes, setWordSchemes] = useState<WordScheme[]>([]);
  /** Documentのデータ */
  const documentScheme: DocumentScheme = {
    // TODO: fix it
    id:
      typeof router.query.documentId === "string"
        ? parseInt(router.query.documentId)
        : 0,
    sentence,
    translation,
    marks: wordSchemes
      .filter((wordScheme) => wordScheme.mark !== "")
      .map((wordScheme) => ({
        index: wordScheme.index,
        type: wordScheme.mark === "show" ? 1 : 2,
      })),
  };

  const handleClickSave = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    console.log("documentScheme", documentScheme);
    params.append("id", documentScheme.id.toString());
    params.append("sentence", documentScheme.sentence);
    params.append("translation", documentScheme.translation);
    documentScheme.marks.forEach((mark) => {
      params.append("marks", JSON.stringify(mark));
    });

    axios
      .put("http://localhost:3000/document", params)
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
