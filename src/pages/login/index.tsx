import {
  Button,
  Card,
  CardBody,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "@/hooks/hooks";
import {
  AUTORIZATION_NAME_CHANGE,
  AUTORIZATION_PASSWORD_CHANGE,
  LOGIN_ACCOUNT_ACTION,
  REGISTER_ACCOUNT_ACTION,
} from "@/modules/authorization/authorization-constants";
import {
  authorizationFormsSelector,
  authorizationisAuthorizedSelector,
  authorizationisLoadingSelector,
} from "@/modules/authorization/authorization-selectors";
import { useRouter } from "next/router";

import { useState } from "react";
import { Eye, EyeSlash } from "styled-icons/bootstrap";
import LoginInfo from "@/components/login-info/login-info";

function ShowHidePassword({
  isVisible,
  toggleVisibility,
}: {
  isVisible: boolean;
  toggleVisibility: () => void;
}) {
  return (
    <button
      className="focus:outline-none"
      type="button"
      onClick={toggleVisibility}
    >
      {isVisible ? <EyeSlash size={24} /> : <Eye size={24} />}
    </button>
  );
}

export default function LoginPage() {
  const { name, password } = useSelector(authorizationFormsSelector);
  const isLoading = useSelector(authorizationisLoadingSelector);

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const dispatch = useDispatch();
  const router = useRouter();

  const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: AUTORIZATION_NAME_CHANGE,
      name: e.target.value,
    });
  };

  const changePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: AUTORIZATION_PASSWORD_CHANGE,
      password: e.target.value,
    });
  };

  const loginHandler = () => {
    dispatch({
      type: LOGIN_ACCOUNT_ACTION,
    });
  };

  const registerHandler = () => {
    dispatch({
      type: REGISTER_ACCOUNT_ACTION,
    });
  };

  const checkAuth = () => {
    router.push("/api/check-auth");
  };

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <Card className="h-min">
        <CardBody className="p-4 flex flex-col gap-2 min-w-[320px]">
          <h1 className="text-2xl">Авторизация</h1>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 items-center">
              <Input
                labelPlacement="outside"
                label="Логин"
                value={name}
                placeholder="Введите логин"
                onChange={changeNameHandler}
                // errorMessage="test"
                // validationState="invalid"
                endContent={<LoginInfo />}
              />
            </div>
            <Input
              labelPlacement="outside"
              label="Пароль"
              value={password}
              placeholder="Введите пароль"
              onChange={changePasswordHandler}
              type={isVisible ? "text" : "password"}
              endContent={
                <ShowHidePassword
                  isVisible={isVisible}
                  toggleVisibility={toggleVisibility}
                />
              }
            />
          </div>
          <Button isLoading={isLoading} onClick={loginHandler} color="primary">
            Войти
          </Button>
          <Button
            isLoading={isLoading}
            onClick={registerHandler}
            color="primary"
          >
            Зергистрироваться
          </Button>
          <Button isLoading={isLoading} onClick={checkAuth} color="primary">
            Проверить авторизацию
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
