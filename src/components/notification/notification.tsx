import { useDispatch, useSelector } from "@/hooks/hooks";
import { HIDE_NOTIFICATION } from "@/modules/notifications/notification-constants";
import { Button, Card, CardBody } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { CloseOutline } from "styled-icons/evaicons-outline";
import { CloseCircle } from "styled-icons/evaicons-solid";
import { Close } from "styled-icons/evil";

type TNotificationProps = {
  id: string;
  title: string;
  text?: string;
  isVisible: boolean;
};

const StyledNotification = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0px 32px 32px 0px rgba(28, 41, 61, 0.06),
    0px 0px 32px 0px rgba(28, 41, 61, 0.05);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
  border: 1px solid #d7dbec;
  min-width: 200px;
  max-width: 300px;
  transition: 0.5s;
`;

const StyledTitle = styled.span`
  color: #333752;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
`;

const StyledText = styled.span`
  color: #5a607f;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`;

const StyledInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4;
`;

const StyledClose = styled(Close)`
  width: 24px;
  height: 24px;
  stroke-width: 2px;
  fill: #333752;
  &:hover {
    cursor: pointer;
    background-color: #f5f6fa;
    border-radius: 8px;
  }
`;

function Notification(props: TNotificationProps) {
  const dispatch = useDispatch();

  const { id, isVisible, text, title } = props;

  const handleClick = () => {
    dispatch({
      type: HIDE_NOTIFICATION,
      id,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: HIDE_NOTIFICATION,
        id,
      });
    }, 3000);
  }, []);

  return (
    <>
      {isVisible ? (
        <Card>
          <CardBody className="flex flex-row gap-2 min-w-[180px] max-w-[320px]">
            <div className="flex flex-col gap-2">
              <p className="text-small">{title}</p>
              {text ? <p className="text-tiny">{text}</p> : null}
            </div>
            <Button variant="light" isIconOnly onClick={handleClick}>
              <CloseOutline size={24} />
            </Button>
          </CardBody>
        </Card>
      ) : null}
    </>
  );
}

export default Notification;
