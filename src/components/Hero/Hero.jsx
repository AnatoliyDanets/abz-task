import s from "./Hero.module.scss";
import { Section } from "../Section/Section";
import ButtonsAuth from "../ButtonsAuth/ButtonsAuth";
import Container from "../Container/Container";

export default function Hero() {
  return (
    <Section className={s.hero}>
      <Container color={{ backgroundColor: "unset" }}>
        <h1 className={s.hero__title}>
          Test assignment for front-end developer
        </h1>
        <p className={s.hero__text}>
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they'll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.
        </p>
        <ButtonsAuth
          width={{ width: "100px", margin: "0 auto" }}
          children={"Sign up"}
        />
      </Container>
    </Section>
  );
}
