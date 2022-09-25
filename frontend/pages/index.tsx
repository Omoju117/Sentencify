import { VFC } from "react";
import style from "./../styles/Home.module.css";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

// : [RequestInfo | URL, RequestInit]

const Home: VFC<void> = () => {
  const { data, error } = useSWR("http://localhost:3000/", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  console.log("result is", data);

  return (
    <div className={style.container}>
      <h1>Frontend is successfully displaying!</h1>
      <span>{data.result}</span>
    </div>
  );
};

export default Home;

// export const getServerSideProps = async () => {
//   const result: string = "dummy";
//   await fetch("http://localhost:3000/")
//     .then((res) => console.log(res, "success"))
//     .catch((err) => {
//       console.log("something wrong", err);
//     });

//   return {
//     props: {
//       result,
//     },
//   };
// };
