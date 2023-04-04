import useSWR from "swr";
import { DocumentListItem } from "../components/atoms/DocumentBar";
export interface IFetchDocuments {
  data: DocumentListItem[] | undefined;
  error: Error | undefined;
}
/** Documentのリストをfetchする処理 */
export const useFetchDocuments = (): IFetchDocuments => {
  const fetcher = (...args) =>
    fetch(...args, { credentials: "include" }).then((res) => res.json());
  const { data, error } = useSWR(`http://localhost:3000/documents`, fetcher);

  return { data, error };
};
