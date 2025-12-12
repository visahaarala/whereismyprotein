import { useReducer, type FC, type ReactNode } from "react";
import { FineliContext } from "./FineliContext";
import { initialState, reducer } from "./FineliContext";

const FineliContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <FineliContext.Provider value={{ state, dispatch }}>
      {children}
    </FineliContext.Provider>
  );
};

export default FineliContextProvider;
