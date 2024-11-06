import { useInfiniteQuery } from "@tanstack/react-query";
import { infiniteFetch } from "../API/api";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Loading from "../Components/UIs/Loading";
import { useInView } from "react-intersection-observer";

const InfiniteScrolling = () => {
  const { ref, inView } = useInView({
    threshold: 1,
  });
  const {
    data,
    hasNextPage,
    fetchNextPage,
    status,
    isPending,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["infinite-users"],
    queryFn: async ({ pageParam = 1, signal }) =>
      infiniteFetch(pageParam, { signal }),
    getNextPageParam: (currPage, allPages) => {
      //   console.log(currPage);
      //   console.log(allPages);
      return currPage?.length === 10 ? allPages?.length + 1 : undefined;
    },
  });

  // Logic to check that the page has been scrolled to bottom and it is time to fetch more data
  // const handleScroll = () => {
  //   window.scrollY > 10 ? setBool(true) : setBool(false);
  //   const bottom =
  //     window.innerHeight + window.scrollY >=
  //     document.documentElement.scrollHeight - 10;
  // };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
    // window.addEventListener("scroll", handleScroll);
    // return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, fetchNextPage, inView]);

  if (isPending) return <Loading />; // Loading state
  if (status === "error") return <p>Error: {"Something went wrong"}</p>; // error state
  return (
    <div className="flex flex-col items-center my-5">
      {data?.pages[0] ? (
        <h1 className="font-mono text-6xl uppercase font-bold my-6">
          Infinite Scrolling
        </h1>
      ) : (
        <h1>NO DATA</h1>
      )}
      <div>
        {data?.pages?.map((pagesArr, index) => (
          <ul key={index} className={`space-y-3 `}>
            {pagesArr?.map((user) => (
              <li
                key={user?.id}
                className="m-2 p-2 w-[300px] mx-auto border-4 border-red-500"
              >
                <div className="flex gap-2">
                  <img
                    src={user?.avatar_url}
                    alt={`${user?.login}'s image`}
                    width={50}
                    height={50}
                    loading="lazy"
                    className="rounded-full"
                  />
                  <div>
                    <Link to={`${user?.html_url}`} target="_blank">
                      <p className="capitalize font-mono text-lg font-bold hover:opacity-70">
                        {user?.login}
                      </p>
                    </Link>

                    <Link
                      to={`${user?.html_url}?tab=repositories`}
                      target="_blank"
                    >
                      <p className="capitalize font-mono hover:text-green-800">
                        Repos
                      </p>
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div ref={ref}>{isFetchingNextPage && <Loading />}</div>
    </div>
  );
};

export default InfiniteScrolling;
