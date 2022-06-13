import React from "react";
import { useState, useEffect, useRef } from "react";
import Modal from "../Modal/Modal";
import UserSuccess from "../UserSuccess/UserSuccess";
import ButtonsAuth from "../ButtonsAuth/ButtonsAuth";
import { addUsers, getToken, getPositions } from "../../services/Api";
import s from "./CreateForm.module.scss";

export default function CreateForm({ fetchApi }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState([]);
  const [posId, setPosId] = useState(1);
  const [token, setToken] = useState("");
  const [load, setLoad] = useState("Upload your photo");
  const [disabled, setDisabled] = useState(false);
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal((state) => !state);
  };
  const photo = useRef();
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "tel":
        setPhone(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setDisabled(
      !name || !phone || !email || !posId || load === "Upload your photo"
    );
  }, [name, email, phone, posId, load]);

  useEffect(() => {
    getToken()
      .then(({ token }) => setToken(token))
      .catch((error) => console.log(error.message));
  }, []);

  useEffect(() => {
    getPositions()
      .then(({ positions }) => setPosition(positions))
      .catch((error) => console.log(error.message));
  }, []);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPosId(1);
    setLoad("Upload your photo");
  };

  const addEmployee = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("position_id", posId);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append(
      "photo",
      photo.current.files[0],
      photo.current.files[0].name
    );

    addUsers(formData, token)
      .then((res) => {
        if (res.status === 201) {
          setModal(true);
          fetchApi();
        }
      })
      .catch((error) => console.log(error.message));

    resetForm();
  };

  return (
    <>
      <form onSubmit={addEmployee} className={s.form}>
        <div className={s.form__wrapper}>
          <div className={s.form__inputs_wrapper}>
            <input
              type="text"
              className={s.form__input}
              name="name"
              value={name}
              onChange={handleChange}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              minLength={2}
              maxLength={60}
              placeholder="Your name"
              style={{ marginBottom: "50px" }}
              required
            />

            <input
              type="email"
              name="email"
              className={s.form__input}
              value={email}
              onChange={handleChange}
              placeholder="Email"
              pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
              minLength={2}
              maxLength={100}
              style={{ marginBottom: "50px" }}
              required
            />
            <div className={s.form__input_tel}>
              <input
                type="tel"
                name="tel"
                value={phone}
                onChange={handleChange}
                className={s.form__input}
                placeholder="Phone"
                pattern="^[\+]{0,1}380([0-9]{9})$"
                style={{ marginBottom: "4px" }}
                required
              />
              <label className={s.form__label} name="tel">
                +38 (XXX) XXX - XX - XX{" "}
              </label>
            </div>
          </div>
          <div className={s.form__inputs_files}>
            <b className={s.form__radio_title}>Select your position</b>
            <ul className={s.form__radio_list}>
              {position.map((item) => (
                <li className={s.form__radio_item} key={item.id}>
                  <input
                    className={s.form__radio_input}
                    type="radio"
                    id={item.id}
                    name="position_id"
                    value={item.id}
                    onChange={() => setPosId(item.id)}
                    defaultChecked={item.id === 1}
                    required
                  />
                  <label className={s.form__radio_label} htmlFor={item.id}>
                    {item.name}
                  </label>
                </li>
              ))}
            </ul>
            <div className={s.file}>
              <label
                htmlFor="file-upload"
                data-title={load}
                className={s.form__file_input}
              >
                Upload
              </label>

              <input
                type="file"
                id="file-upload"
                accept=".jpeg, .jpg"
                ref={photo}
                title="Minimum size of photo 70x70px. The photo format must be jpeg/jpg type. The photo size must not be greater than 5 Mb."
                className={s.form__input_file}
                required
                onChange={() =>
                  setLoad(photo.current.files[0]?.name ?? "Upload your photo")
                }
              />
            </div>
          </div>
        </div>
        <ButtonsAuth type={"submit"} disabled={disabled} children={"Sign up"} />
      </form>
      {modal && (
        <Modal onClose={toggleModal}>
          <UserSuccess type={"button"} onClick={toggleModal} />
        </Modal>
      )}
    </>
  );
}
