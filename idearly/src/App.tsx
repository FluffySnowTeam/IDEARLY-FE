import { RouterProvider } from "react-router-dom";
import router from "./routes/routing";
import GlobalStyle from "./styles/global";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
