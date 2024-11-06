import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { deletePost, fetchPosts, updatePost } from "../API/api";
import Loading from "../Components/UIs/Loading";
import { NavLink } from "react-router-dom";
import Pagination from "../Components/UIs/Pagination";
import { useState } from "react";

const FetchRQ = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const queryClient = useQueryClient();

  const getPostsData = async ({ signal }) => {
    try {
      const res = await fetchPosts(pageNumber, { signal });
      return res?.status === 200 ? res?.data : [];
    } catch (error) {
      console.log(error.message);
    }
  };

  const { data, isError, error, isPending } = useQuery({
    queryKey: ["posts", pageNumber],
    queryFn: async ({ signal }) => getPostsData({ signal }),
    placeholderData: keepPreviousData, // keeps the previous data until next data is fetched
    // gcTime: 2000, // garbage collection time in ms (cache cleared after 2sec)
    // staleTime: 60000, // stale time in ms (fetch data after 5sec, before that data is fresh and can be displayed from cache) default   stale time is 0sec
    // refetchInterval: 1000, // fetch data after specified time interval (polling) needs stale time to be 0sec, and it pauses the fetching if you switch tabs.
    // refetchIntervalInBackground: true, // fetch data in background, does not pauses if you switch tabs.
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (apiData, postID) => {
      console.log(apiData, postID);
      queryClient.setQueryData(["posts", pageNumber], (currElems) => {
        // to update the frontend and remove the deleted item from cached data
        console.log(currElems); // currElem contain the data related to queryKey["posts", pageNumber]
        return currElems?.filter((post) => post?.id !== postID); // update the data for queryKey["posts", pageNumber] and update UI
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (id) => updatePost(id),
    onSuccess: (apiData, postID) => {
      // apiData is data passed in body while calling the API, postID is passed while calling mutation function
      queryClient.setQueryData(["posts", pageNumber], (currElems) => {
        return currElems?.map((post) =>
          post?.id === postID ? { ...post, title: apiData?.data?.title } : post
        );
      });
    },
  });

  if (isPending) return <Loading />; // Loading state
  if (isError) return <p>Error: {error?.message || "Something went wrong"}</p>; // error state
  return (
    <>
      <div className="space-y-2">
        <ul>
          {data?.map((currElem) => {
            const { id, body, title } = currElem;
            return (
              <li
                key={id}
                className="m-2 p-2 w-[500px] mx-auto border-4 border-red-500"
              >
                <NavLink to={`/rq/${id}`}>
                  <span className="uppercase font-bold font-mono flex">
                    <h5>{id}.</h5>
                    {title}
                  </span>
                  <p>{body}</p>
                </NavLink>
                <button
                  className="bg-black px-4 py-2 text-white font-mono mt-2 mx-1  rounded active:scale-95"
                  onClick={() => deleteMutation.mutate(id)} // .mutate() to run the mutationFn in deleteMutation instance
                >
                  DELETE
                </button>
                <button
                  className="bg-black px-4 py-2 text-white font-mono mt-2 mx-1 rounded active:scale-95"
                  onClick={() => updateMutation.mutate(id)} // .mutate() to run the mutationFn in updateMutation instance
                >
                  UPDATE
                </button>
              </li>
            );
          })}
        </ul>
        <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} />
      </div>
    </>
  );
};

export default FetchRQ;
