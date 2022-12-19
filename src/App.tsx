import { Provider } from "react-redux/es/exports";
import Home from "./pages/Home/home";
import { store } from "./store/index";

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
