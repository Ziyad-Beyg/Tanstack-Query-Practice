import { useQuery } from "@tanstack/react-query";
import { NavLink, useParams } from "react-router-dom";
import { fetchSinglePost } from "../API/api";
import Loading from "../Components/UIs/Loading";

const FetchPost = () => {
  const { id } = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchSinglePost(id),
  });

  if (isPending) return <Loading />;
  if (isError) return <p>Error: {error?.message || "Something went wrong"}</p>;

  return (
    <>
      <div className="m-2 p-2 w-[500px] mx-auto border-4 border-red-500">
        <h1 className="text-center my-2 uppercase font-mono">
          Product ID Number : {data?.id}
        </h1>
        <p className="uppercase font-bold font-mono flex">{data?.title}</p>
        <p>{data?.body}</p>
      </div>
      <NavLink className="flex justify-center" to={"/rq"}>
        <button className=" bg-green-600 px-4 py-2 text-white font-mono my-4 rounded active:scale-95">
          GO BACK
        </button>
      </NavLink>
    </>
  );
};

export default FetchPost;
