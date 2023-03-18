import axios from "axios";
import { useRouter } from "next/router";
import { VFC, useState, useEffect } from "react";
import { DocumentListItem } from "../../components/atoms/DocumentBar";
import { WordScheme } from "../../components/atoms/Word";
import ControlSection from "../../components/organisms/Document/ControlSection";
import NoteSection from "../../components/organisms/Document/NoteSection";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useSentenceModal } from "../../hooks/useSentenceModal";

type MarkScheme = {
  index: number;
  type: string;
};

export type DocumentScheme = {
  id: number;
  userId: number;
  sentence: string;
  translation: string;
  createdAt: string;
  updatedAt: string;
  marks: MarkScheme[];
};

const Document: VFC<void> = () => {
  const router = useRouter();
  // TODO: start with here next.
  const [document, setDocument] = useState<DocumentScheme>({
    id: 0,
    userId: 0,
    sentence: "",
    translation: "",
    createdAt: "",
    updatedAt: "",
    marks: [],
  });
  /** 英文を構成するWordの配列データ */
  const [wordSchemes, setWordSchemes] = useState<WordScheme[]>([]);

  // TODO: fix it. it's temporal function.
  const getMarkType = (typeId: number) => {
    switch (typeId) {
      case 1:
        return "show";
      case 2:
        return "note";
      default:
        return "";
    }
  };
  // Sentence入力モーダル
  const [SentenceModal, open, isOpenModal] = useSentenceModal({
    functions: { setWordSchemes, setDocument },
  });

  // IDで指定されたドキュメントを取得する
  const fetchDocument = (documentId: string) => {
    axios
      .get("http://localhost:3000/document", {
        params: {
          id: documentId,
          userId: "1",
        },
      })
      .then((res) => {
        console.log("res", res.data);
        const document: DocumentScheme = res.data;
        setDocument(document);
        const words: WordScheme[] = document.sentence
          .split(" ")
          .map((word, index) => ({
            word,
            index,
            mark: "",
            isVisible: false,
          }));
        document.marks.forEach((mark) => {
          const markedWord = words[mark.index];
          markedWord.mark = getMarkType(parseInt(mark.type));
          markedWord.isVisible = parseInt(mark.type) === 1;
        });
        setWordSchemes(words);
      })
      .catch((err) => {
        console.log("error in request", err);
      });
  };
  /** 初回表示時にデータ取得処理 */
  useEffect(() => {
    if (router.query.isExisting) {
      //TODO: fix here
      fetchDocument(
        typeof router.query.documentId === "string"
          ? router.query.documentId
          : "1"
      );
    } else {
      setDocument({
        id:
          typeof router.query.documentId === "string"
            ? parseInt(router.query.documentId)
            : 0,
        userId: 1,
        sentence: "",
        translation: "",
        createdAt: "",
        updatedAt: "",
        marks: [],
      });
    }
  }, [router.query]);

  // Documentのリストを取得する
  const { data, error } = useFetchDocuments();
  const documentListItems: DocumentListItem[] = data;
  if (error) return <div>Failed to load</div>;
  if (!documentListItems) return <div>Loading...</div>;

  /**
   * 保存ボタン押下時処理
   * @param e イベント
   */
  const handleClickSave = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    console.log("save start");
    console.log("documentScheme", document);
    params.append("id", document.id.toString());
    params.append("sentence", document.sentence);
    params.append("translation", document.translation);
    wordSchemes
      .filter((word) => word.mark !== "")
      .map((word) => ({
        index: word.index,
        type: word.mark === "show" ? 1 : 2,
      }))
      .forEach((mark) => {
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
    <div className="relative w-[100vw] h-[100vh]">
      <div className="flex flex-col px-10">
        {isOpenModal ? <SentenceModal /> : ""}
        <div className="absolute z-10">
          <div className="flex w-full h-10 bg-black text-white space-x-2">
            <button
              className="w-[10%] rounded"
              onClick={() => {
                router.push({
                  pathname: `/documents`,
                });
              }}
            >
              back to list
            </button>
            <button
              className="w-[10%] rounded"
              onClick={() => {
                const currentIndex = documentListItems.findIndex(
                  (documentListItem) => documentListItem.id === document.id
                );
                fetchDocument(
                  documentListItems[currentIndex + 1].id.toString()
                );
              }}
            >
              next
            </button>
            <button className="w-[10%] rounded" onClick={open}>
              edit
            </button>
          </div>
          <div className="flex py-8">
            <ControlSection
              states={{ documentScheme: document, wordSchemes }}
              functions={{ setWordSchemes, handleClickSave }}
            />
            <NoteSection
              states={{ translation: document.translation }}
              functions={{ setDocument }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Document;
