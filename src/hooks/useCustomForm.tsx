import { ChangeEvent, useCallback, useState } from "react";

const useCustomForm = () => {
  const [id, setId] = useState("");

  const [password, setPassword] = useState("");

  const [content, setContent] = useState("");

  const idHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  }, []);

  const passwordHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const contentHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  }, []);

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
