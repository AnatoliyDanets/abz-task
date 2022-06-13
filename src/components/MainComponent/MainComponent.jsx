import Main from "../Main/Main";
import { lazy } from "react";
const Hero= lazy(() => import("../Hero/Hero"));
const Employees=lazy(()=>import('../Employees/Employees'))
export default function MainComponent() {
  return (
    <Main>
      <Hero />
      <Employees />
    </Main>
  );
}
