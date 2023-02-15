import axios from "axios";
import { VFC } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Documents: VFC<void> = () => {
  const router = useRouter();
  const { data: documents, error } = useSWR(
    `http://localhost:3000/documents?userId=1`,
    fetcher
  );
  console.log(documents);
  if (error) return <div>Failed to load</div>;
  if (!documents) return <div>Loading...</div>;

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
        // TODO: fix here to use path parameter
        console.log("res.data.id", res.data.id);
        router.push({
          pathname: "/document",
          query: { documentId: res.data.id },
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
      {documents.map((document, i) => {
        return (
          <button
            key={document.id + i}
            className="w-[50%] bg-gray-100 py-3 border-l border-b border-r rounded"
          >
            {document.sentence}
          </button>
        );
      })}
    </div>
  );
};

export default Documents;
