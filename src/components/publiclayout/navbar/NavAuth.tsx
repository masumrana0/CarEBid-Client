import React, { useState } from "react";
import { Modal } from "antd";
import {
  GoogleOutlined,
  FacebookFilled,
  AppleFilled,
  MailOutlined,
} from "@ant-design/icons";
import AuthWithThirdPerty from "@/components/auth/authWithThirdPerty";
import Image from "next/image";
import logo from "../../../../public/assets/Logo/car.png";
import SignUpPage from "@/components/auth/signup";
import { Sign } from "crypto";
import SignInPage from "@/components/auth/signin";
import ForgotPassword from "@/components/auth/forgotPassword";

const NavAuth: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [authState, setAuthState] = useState<number>(0);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <button
        onClick={showModal}
        className="2xl:px-6 2xl:py-3 px-4  py-2 rounded bg-green-400 hover:bg-green-500 font-[500] md:text-md text-sm 2xl:text-lg"
      >
        Sign In
      </button>
      <Modal
        title={
          <div className="flex items-center justify-center">
            <Image
              src={logo}
              className="w-16 h-16"
              width={500}
              height={500}
              alt="Car"
            />
          </div>
        }
        open={isModalVisible}
        footer={null}
        onCancel={handleCancel}
        centered
        closeIcon={<span style={{ fontSize: "20px" }}>✕</span>}
      >
        {authState === 0 && <SignInPage setAuthState={setAuthState} />}
        {authState === 1 && <SignUpPage setAuthState={setAuthState} />}

        {authState === 3 && <ForgotPassword setAuthState={setAuthState} />}
      </Modal>
    </>
  );
};

export default NavAuth;
