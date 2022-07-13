import moment from "moment";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGlobalContext } from "./context";
import { useId } from "react";

const Stories = () => {
  const { hits, removePost, getNextPage } = useGlobalContext();

  const id = useId();
  return (
    <>
      <div className="stories-div">
        <InfiniteScroll
          dataLength={hits.length}
          next={getNextPage}
          hasMore={true}
          loader={<h1>Loading...</h1>}
        >
          {hits.map((e) => {
            return (
              <>
                <div key={id} className="card">
                  <h2>{e.title}</h2>
                  <p>
                    By <span>{e.author}</span> | <span>{e.num_comments}</span>
                    comments
                  </p>
                  <br />
                  <p>
                    posted on:-
                    <span> {moment(e.created_at).format("DD/MM/YYYY")} </span>
                  </p>
                  <br />
                  <br />
                  <div className="card-button">
                    <a href={e.url} target="_blank" rel="noreferrer">
                      read more
                    </a>
                    <a href="#" onClick={() => removePost(e.objectID)}>
                      remove
                    </a>
                  </div>
                </div>
                <br />
              </>
            );
          })}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Stories;
