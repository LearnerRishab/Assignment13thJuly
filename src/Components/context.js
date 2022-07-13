import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "../reducer";

let API_URL = "https://hn.algolia.com/api/v1/search?"; //FirstStep
//https://hn.algolia.com/api/v1/search?query=css //Original API

const initialState = {
  isLoading: true,
  query: "",
  nbPages: 0,
  page: 0,
  hits: [],
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchApiData = async (api) => {
    dispatch({
      type: "SET_LOADING",
    });

    try {
      const res = await fetch(api);
      const data = await res.json();
      console.log(data)
      dispatch({
        type: "GET_STORIES",
        payload: {
          hits: data.hits,
          nbPages: data.nbPages,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  //to remove the post

  const removePost = (post_ID) => {
    dispatch({
      type: "REMOVE_POST",
      payload: post_ID,
    });
  };

  //to search the post
  const searchPost = (searchQuery) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: searchQuery,
    });
  };
  const getNextPage = () => {
    dispatch({
        type: "NEXT_PAGE",
      });
  };

  const getPrevPage = () => {
    dispatch({
      type: "PREV_PAGE",
    });
  };

  useEffect(() => {
    let timerOut = setTimeout(() => {
      fetchApiData(`${API_URL}query=${state.query}&page=${state.page}`);
    }, 800);
    return () => clearTimeout(timerOut);
  }, [state.query,state.page]);

  return (
    <AppContext.Provider
      value={{ ...state, removePost, searchPost, getPrevPage, getNextPage }}
    >
      {children}
    </AppContext.Provider>
  );
};

//custom hook

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
