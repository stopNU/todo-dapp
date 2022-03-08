//import { useContext } from "react";
//import TodoContext from "./store/todo-context";

// components
import Header from "./components/Header";
import ToDo from "./features/todo/ToDo";

function App() {
  //const { account } = useContext(TodoContext);

  return (
    <div>
      <Header />
      <main>
        <ToDo />
      </main>
    </div>
  );
}

export default App;
