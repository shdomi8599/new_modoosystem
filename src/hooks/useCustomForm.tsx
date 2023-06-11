import { ChangeEvent, useState } from "react";

const useCustomForm = () => {
  const [id, setId] = useState("");

  const [password, setPassword] = useState("");

  const [content, setContent] = useState("");

  const idHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const contentHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  return {
    id,
    password,
    content,
    idHandler,
    passwordHandler,
    contentHandler,
  };
};

export default useCustomForm;
