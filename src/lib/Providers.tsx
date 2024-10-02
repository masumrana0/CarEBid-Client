"use client";
import { store } from "@/Redux/store";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { AntdRegistry } from "@ant-design/nextjs-registry";
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <Toaster />
      <AntdRegistry>{children}</AntdRegistry>
    </Provider>
  );
};

export default Providers;
