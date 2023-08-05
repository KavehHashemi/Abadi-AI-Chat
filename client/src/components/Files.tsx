import { ApolloError, useQuery } from "@apollo/client";
import { FILES_QUERY } from "../graphql";
import SingleFile from "./SingleFile";
import { FileType } from "../types";
import { request } from "./request";

const Files = () => {
  const { data, loading, error } = useQuery(FILES_QUERY);

  // const url = "http://127.0.0.1:4000/ex";

  // const get = async () => {
  //   const res: Response = await request(url);
  //   if (res.ok) console.log(res);
  //   console.log(new ApolloError({}));

  //   // const res = await fetch(url, {
  //   //   method: "GET",
  //   //   headers: { "Content-Type": "Application/json" },
  //   // });
  //   // console.log(res.statusText);
  // };
  // get();

  if (loading) return <div>loading</div>;
  if (error) {
    console.log(error);

    return <div>{error.message}</div>;
  } else {
    console.log(data.files);
    return (
      <div
        style={{
          padding: "3rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        {data.files.map((f: FileType, i: number) => {
          return <SingleFile key={i} name={f.filename}></SingleFile>;
        })}
        <></>
      </div>
    );
  }
};

export default Files;
