import { useEffect, useState } from "react";
import { fetchPostsOld } from "../API/api";
import Loading from "../Components/UIs/Loading";

const FetchOld = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPostsData = async () => {
    try {
      const res = await fetchPostsOld();
      res?.status === 200 ? setPosts(res?.data) : [];
      setIsLoading(false);
      // console.log(res);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
      return [];
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getPostsData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <ul>
            {posts?.map((currElem) => {
              const { id, body, title } = currElem;
              return (
                <li
                  key={id}
                  className="m-2 p-2 w-[500px] mx-auto border-4 border-red-500"
                >
                  <p className="uppercase font-bold font-mono">{title}</p>
                  <p className="">{body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default FetchOld;
