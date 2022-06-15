import Main from "../Main";
import loadable from "@loadable/component";

const Hero = loadable(() => import("../Hero"));
const Employees = loadable(() => import("../Employees"));

export default function MainComponent() {
  return (
    <Main>
      <Hero />
      <Employees />
    </Main>
  );
}
