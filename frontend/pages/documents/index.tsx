import axios from "axios";
import { VFC } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import DocumentBar, {
  DocumentListItem,
} from "../../components/atoms/DocumentBar";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Documents: VFC<void> = () => {
  const router = useRouter();
  /** ドキュメントリストの要素 */
  let documentListItems: DocumentListItem[];
  const { data, error } = useSWR(
    `http://localhost:3000/documentListItems?userId=1`,
    fetcher
  );
  documentListItems = data;
  if (error) return <div>Failed to load</div>;
  if (!documentListItems) return <div>Loading...</div>;

  /**
   * ドキュメント新規作成ボタンクリック時の処理
   * @param e イベント
   */
  const handleClickCreate = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.append("userId", "1");

    axios
      .post("http://localhost:3000/document", params)
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
    <div className="flex flex-col w-[100vw] h-[100vh] items-center justify-start py-20">
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
    </div>
  );
};

export default Documents;
