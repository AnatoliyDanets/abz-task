import Main from "../Main/Main";
import loadable from "@loadable/component";

const Hero= loadable(() => import("../Hero/Hero"));
const Employees=loadable(()=>import('../Employees/Employees'))
export default function MainComponent() {
  return (
    <Main>
      <Hero />
      <Employees />
    </Main>
  );
}
