import { lazy, useEffect, useState } from "react";
import ButtonsAuth from "../ButtonsAuth/ButtonsAuth";
import { Section } from "../Section/Section";
import Container from "../Container/Container";
import s from "./Employees.module.scss";
import SectionTitle from "../SectionTitle/SectionTitle";
import { getUsers } from "../../services/Api";
import Loader from "../Loader/Loader";

const Employee = lazy(() => import("../Employee/Employee"));
const CreateForm = lazy(() => import("../CreateForm/CreateForm"));
export default function Employees() {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(2);
  const [hidden, setHidden] = useState(true);
  const [show, setShow] = useState(false);

  const fetchApi = () => {
    getUsers(1)
      .then((data) => {
        console.log(data.users);
        setShow(false);
        setUsers(data.users);
        setTotalPages(data.total_pages);
        setPage(2);
      })
      .catch((error) => console.log(error))
      .finally(setShow(true));
  };

  useEffect(() => {
    fetchApi();
    // eslint-disable-next-line
  }, []);

  const getNextUsers = () => {
    if (page === totalPages) {
      setHidden(false);
    }
    setPage((prev) => prev + 1);
    getUsers(page)
      .then((data) => {
        setShow(false);

        setUsers((prev) => [...prev, ...data.users]);
      })
      .catch((error) => console.log(error))
      .finally(setShow(true));
  };
  return (
    <>
      <Section className={s.employees}>
        <Container color={{ backgroundColor: "#f8f8f8" }}>
          <SectionTitle title={"Working with GET request"} />
          <ul className={s.employees__list}>
            {show && <Loader />}
            {users
              .sort(
                (a, b) => b.registration_timestamp - a.registration_timestamp
              )

              .map((user) => (
                <Employee
                  key={user.id}
                  title={user.name}
                  text={user.position}
                  email={user.email}
                  tel={user.phone}
                  photo={user.photo}
                />
              ))}
          </ul>

          {hidden && (
            <ButtonsAuth
              width={{ width: "120px", margin: "0 auto" }}
              onClick={getNextUsers}
              children={"Show more"}
            />
          )}
        </Container>
      </Section>
      <Section className={s.addEmployee}>
        <Container color={{ backgroundColor: "#f8f8f8" }}>
          <SectionTitle title={"Working with POST request"} />
          <CreateForm fetchApi={fetchApi} />
        </Container>
      </Section>
    </>
  );
}
