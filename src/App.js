import "./App.scss";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader/Loader";
const Header = lazy(() => import("./components/Header/Header"));
const MainComponent = lazy(() =>
  import("./components/MainComponent/MainComponent")
);

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Header />
      <MainComponent />
    </Suspense>
  );
}

export default App;
