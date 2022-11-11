import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { login, logout } from "../features/user/userSlice";
import { RootState } from "./store";

const listenerMiddleware = createListenerMiddleware();

