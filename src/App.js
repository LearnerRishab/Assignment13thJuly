import "./App.css";
import Pagination from "./Components/Pagination";
import Search from "./Components/Search";
import Stories from "./Components/Stories";

function App() {
  // const data= useContext(AppContext) //Traditional method for using useContext Hook
  //const data = useGlobalContext()

  return (
    <>
      <Search />
      {/* <Pagination/> */}
      <br />
      <br />
      <br />
     
      <Stories />
    </>
  );
}

export default App;
