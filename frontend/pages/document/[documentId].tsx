import { useRouter } from "next/router";
import { VFC, useState, useEffect, useCallback } from "react";
import { axiosInstance } from "../../apis/api";
import { DocumentListItem } from "../../components/atoms/DocumentBar";
import { WordScheme } from "../../components/atoms/Word";
import ControlSection from "../../components/organisms/Document/ControlSection";
import NoteSection from "../../components/organisms/Document/NoteSection";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useSentenceModal } from "../../hooks/useSentenceModal";
import { useOtherPhraseModal } from "../../hooks/useOtherPhraseModal";

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
  const [fetchSignal, setFetchSignal] = useState([""]);
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
  const [SentenceModal, openSentenceModal, isOpenSentenceModal] =
    useSentenceModal({
      functions: { setWordSchemes, setDocument },
    });

  // 指定のフレーズを使った他の例文モーダル
  const [
    OtherPhraseModal,
    setOtherPhrase,
    openOtherPhraseModal,
    isOpenOtherPhraseModal,
  ] = useOtherPhraseModal({ functions: { setFetchSignal } });

  // IDで指定されたドキュメントを取得する
  const fetchDocument = useCallback(async (documentId: string) => {
    await axiosInstance
      .get("/document", {
        params: {
          documentId,
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
            isVisible: router.query.isVisible ? true : false,
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
  }, []);
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
        //TODO: delete this unnecessary userId
        userId: 1,
        sentence: "",
        translation: "",
        createdAt: "",
        updatedAt: "",
        marks: [],
      });
      openSentenceModal();
    }
  }, [router.query, fetchDocument, fetchSignal]);

  // Documentのリストを取得する
  const { data, error } = useFetchDocuments();
  const documentListItems: DocumentListItem[] = data;
  if (error) return <div>Failed to load</div>;
  if (!documentListItems) return <div>Loading...</div>;

  /**
   * 保存ボタン押下時処理
   * @param e イベント
   */
  const handleClickSave = async (e) => {
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

    await axiosInstance
      .put("/document", params)
      .then((res) => {
        console.log("res", res.data);
      })
      .catch((err) => {
        console.log("error in request", err);
      });
  };

  return (
    <div className="relative w-[100vw] h-[100vh]">
      {isOpenSentenceModal ? <SentenceModal /> : ""}
      {isOpenOtherPhraseModal ? <OtherPhraseModal /> : ""}
      <div className="h-full w-full absolute z-10">
        <div className="flex h-full w-full">
          <div className="flex flex-col items-center h-full w-[10%] bg-gray-500 text-gray-300 text-[16px] leading-6">
            <span className="text-[20px] font-bold text-gray-800 p-3 border-b-4 border-gray-700">
              Sentencify
            </span>
            <button
              className="border-b border-gray-700 p-3"
              onClick={() => {
                router.push({
                  pathname: `/documents`,
                });
              }}
            >
              back to list
            </button>
            <button
              className="border-b border-gray-700 p-3"
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
            <button
              className="border-b border-gray-700 p-3"
              onClick={openSentenceModal}
            >
              edit
            </button>
            <button
              className="border-b border-gray-700 p-3"
              onClick={openOtherPhraseModal}
            >
              OpenAI
            </button>
          </div>
          <ControlSection
            states={{
              documentScheme: document,
              wordSchemes,
              isOpenOtherPhraseModal,
            }}
            functions={{ setWordSchemes, setOtherPhrase, handleClickSave }}
          />
          <NoteSection
            states={{ translation: document.translation }}
            functions={{ setDocument }}
          />
        </div>
      </div>
    </div>
  );
};

export default Document;
