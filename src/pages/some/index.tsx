import { useDispatch, useSelector } from "@/hooks/hooks";
import { ADD_ACTION, ADD_DELAY_ACTION } from "../../types/action-constants";
import React, { useEffect, useState } from "react";

type indexProps = {};

export default function Home(props: indexProps) {
  const dispatch = useDispatch();
  const count = useSelector((s) => s.app.count);
  const onClick = () => {
    dispatch({
      type: ADD_ACTION,
      number: 2,
    });
  };
  const onClickDelay = () => {
    dispatch({
      type: ADD_DELAY_ACTION,
    });
  };
  return (
    <div>
      <button onClick={onClick}>{count}</button>
      <button onClick={onClickDelay}>Delay {count}</button>
    </div>
  );
}
