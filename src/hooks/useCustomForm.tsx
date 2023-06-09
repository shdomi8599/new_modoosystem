import { ChangeEvent, useState } from "react";

const useCustomForm = () => {
  const [id, setId] = useState("");
  const idHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const [password, setPassword] = useState("");
  const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return {
    id,
    password,
    idHandler,
    passwordHandler,
  };
};

export default useCustomForm;
