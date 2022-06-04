import { useEffect, useReducer } from "react";
import "./App.css";

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return { ...state };
  }
}

const initialState = {
  loading: false,
  users: [],
  error: null,
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // -----------LOADING STARTS THATS WHY PAYLOAD IS "TRUE"-----------------------
    dispatch({ type: "SET_LOADING", payload: true });

    // -----------LOADING FINISH THATS WHY PAYLOAD IS "FALSE"-----------------------
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((res) => {
        dispatch({ type: "SET_USERS", payload: res });
        dispatch({ type: "SET_LOADING", payload: false });
      })
      .catch(() => {
        dispatch({ type: "SET_LOADING", payload: false });
        dispatch({ type: "SET_ERROR", payload: "Api not working!" });
      });
  }, []);

  console.log("state: ", state);

  if (state.loading) {
    return <div>loading</div>;
  }

  return (
    <div className="App">
      {state.users.length > 0 &&
        state.users.map((data) => {
          return <p key={data.id}>{data.username}</p>;
        })}
    </div>
  );
}

export default App;
