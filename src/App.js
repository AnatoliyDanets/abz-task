import Loader from "./components/Loader";
import loadable from "@loadable/component";
const Header = loadable(() => import("./components/Header"));
const MainComponent = loadable(() => import("./components/MainComponent"), {
  Loader: () => Loader,
});

function App() {
  return (
    <>
      <Header />
      <MainComponent />
    </>
  );
}

export default App;
