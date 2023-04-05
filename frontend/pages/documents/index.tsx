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
  const { data, error } = useFetchDocuments();
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
      .post("http://localhost:3000/document")
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

  const handleClickVerify = async (e) => {
    e.preventDefault();
    await axiosInstance
      .post("http://localhost:3000/verifyToken")
      .then((res) => {
        console.log("verify result: ", res.data);
      })
      .catch((err) => {
        console.log("error in request", err);
      });
  };

  return (
    <div className="flex flex-col w-[100vw] h-[100vh]">
      <Header />
      <div className="flex flex-col items-center justify-start py-16">
        <button
          className="w-[50%] bg-green-500 text-white py-3 rounded"
          onClick={handleClickCreate}
        >
          <span className="text-[16px] leading-5">Create New Document</span>
        </button>
        {documentListItems.map((documentListItem) => {
          return (
            <DocumentBar
              key={documentListItem.id}
              documentListItem={documentListItem}
            />
          );
        })}
        <button
          className="mt-40 bg-black text-white rounded p-3 w-[10%]"
          onClick={handleClickVerify}
        >
          <span>Verify</span>
        </button>
      </div>
    </div>
  );
};

export default Documents;
