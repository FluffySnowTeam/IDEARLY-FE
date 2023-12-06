import { RouterProvider } from "react-router-dom";
import router from "./routes/routing";
import GlobalStyle from "./styles/global";

function App() {
  return (
    <div>
      <GlobalStyle />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
