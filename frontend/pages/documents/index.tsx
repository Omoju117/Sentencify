import { VFC } from "react";
import { useRouter } from "next/router";
import DocumentBar, {
  DocumentListItem,
} from "../../components/atoms/DocumentBar";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import Header from "../../components/templates/Header";
import { axiosInstance } from "../../apis/api";

const Documents: VFC<void> = () => {
  const router = useRouter();
  /** ドキュメントリストの要素 */
  const { data, error, setDocumentList } = useFetchDocuments();
  const documentListItems: DocumentListItem[] = data;
  if (error) return <div>Failed to load</div>;
  if (!documentListItems) return <div>Loading...</div>;

  /**
   * ドキュメント新規作成ボタンクリック時の処理
   * @param e イベント
   */
  const handleClickCreate = async (e) => {
    e.preventDefault();
    await axiosInstance
      .post("/document")
      .then((res) => {
        console.log("res", res.data);
        const document = res.data;
        router.push({
          pathname: `/document/${document.id}`,
        });
      })
      .catch((err) => {
        console.log("error in request", err);
      });
  };

  return (
    <div className="flex flex-col w-[100vw] h-[100vh] items-center">
      <Header />
      <div className="w-[80%] flex flex-col items-center justify-center py-16">
        <button
          className="w-[75%] bg-green-500 text-white py-3 rounded"
          onClick={handleClickCreate}
        >
          <span className="text-[16px] leading-5">Create New Document</span>
        </button>
        {documentListItems.map((documentListItem) => {
          return (
            <DocumentBar
              key={documentListItem.id}
              documentListItem={documentListItem}
              functions={{ setDocumentList }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Documents;
