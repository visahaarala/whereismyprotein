import { useReducer, type FC, type ReactNode } from "react";
import { initialState, reducer, UsdaContext } from "./UsdaContext";

const UsdaContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UsdaContext.Provider value={{ state, dispatch }}>
      {children}
    </UsdaContext.Provider>
  );
};

export default UsdaContextProvider;
