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

  const [content, setContent] = useState("");
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
