import { useSelector } from "@/hooks/hooks";
import { notificationsSelector } from "./notification-selectors";
import styled from "styled-components";
import Notification from "@/components/notification/notification";

const StyledNotificationContainer = styled.div`
  position: absolute;
  right: 16px;
  top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 300px;
`;

export const NotificationModule = () => {
  const notifications = useSelector(notificationsSelector);
  return (
    <StyledNotificationContainer>
      {notifications.map(({ isVisible, title, text, id }) => (
        <Notification
          key={id}
          isVisible={isVisible}
          id={id}
          title={title}
          text={text}
        />
      ))}
    </StyledNotificationContainer>
  );
};
