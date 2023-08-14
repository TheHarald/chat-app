import Button from "@/components/button/button";
import Input from "@/components/input/Input";
import Loader from "@/components/loader/loader";
import Notification from "@/components/notification/notification";
import { useDispatch, useSelector } from "@/hooks/hooks";
import { SHOW_NOTIFICATION } from "@/modules/notifications/notification-constants";
import {
  LOGIN_ACCOUNT_ACTION,
  REGISTER_ACCOUNT_ACTION,
} from "@/types/action-constants";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const isLoading = useSelector((s) => s.authorization.isLoading);

  const dispatch = useDispatch();
  const router = useRouter();

  const validate = () => {
    if (name.length === 0 || password.length === 0) {
      dispatch({
        type: SHOW_NOTIFICATION,
        title: "Поля не должны быть пустыми",
      });
      return true;
    }
    return false;
  };

  const loginHandler = () => {
    if (validate()) {
      return;
    }
    dispatch({
      type: LOGIN_ACCOUNT_ACTION,
      password,
      name,
    });
  };

  const registerHandler = () => {
    if (validate()) {
      return;
    }
    dispatch({
      type: REGISTER_ACCOUNT_ACTION,
      password,
      name,
    });
  };

  const clearHandler = () => {
    console.log(name);
    setName("");
  };

  const checkAuth = () => {
    router.push("/api/test");
  };

  return (
    <div>
      <h1>Login Page</h1>
      <Input
        value={name}
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
        onReset={clearHandler}
      />
      <br />
      <Input
        value={password}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        onReset={() => setPassword("")}
      />
      <Loader isLoading={isLoading} />
      <br />
      <Button onClick={loginHandler} text="Войти" />
      <br />
      <Button onClick={registerHandler} text="Зергистрироваться" />
      <br />
      <Button onClick={checkAuth} text="Проверить авторизацию" />
      <Notification />
    </div>
  );
}
