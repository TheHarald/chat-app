import React from "react";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { Info } from "styled-icons/fluentui-system-regular";

function InfoIcon() {
  return <Info size={24} />;
}
function LoginInfo() {
  return (
    <>
      <Popover placement="right">
        <PopoverTrigger>
          <Info className="cursor-pointer" size={24} />
        </PopoverTrigger>
        <PopoverContent>
          <div className="px-1 py-2 max-w-[180px]">
            <div className="text-tiny">
              Логин будет использован в качестве никнейма
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default LoginInfo;
