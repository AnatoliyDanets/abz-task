import Loader from "./components/Loader/Loader";
import loadable from "@loadable/component";
const Header = loadable(() => import("./components/Header/Header"));
const MainComponent = loadable(() =>
  import("./components/MainComponent/MainComponent"), {
    Loader: () => Loader
  })


function App() {
  return (
    <>
      <Header />
      <MainComponent />
    </>
  );
}

export default App;
