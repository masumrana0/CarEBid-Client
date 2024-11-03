"use client";
import React from "react";
import { Dropdown, Avatar, Button, Menu } from "antd";
import type { MenuProps } from "antd";
import {
  AiOutlineUser,
  AiOutlineEye,
  AiOutlineShop,
  AiOutlineSetting,
  AiOutlineLogout,
} from "react-icons/ai";

const ProfileDropdown: React.FC = () => {
  const menuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <AiOutlineUser />,
      label: "Profile",
    },
    {
      key: "watchlist",
      icon: <AiOutlineEye />,
      label: "Watch List",
    },
    {
      key: "dashboard",
      icon: <AiOutlineShop />,
      label: "Seller Dashboard",
    },
    {
      key: "settings",
      icon: <AiOutlineSetting />,
      label: "Settings",
    },
    {
      type: "divider",
    },
    {
      key: "signout",
      icon: <AiOutlineLogout />,
      label: "Sign Out",
    },
  ];

  const menu = (
    <Menu
      items={menuItems}
      style={{
        borderRadius: "8px",
        padding: "8px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    />
  );

  return (
    <div className="flex items-center space-x-3">
      <Dropdown
        menu={{ items: menuItems }}
        trigger={["click"]}
        placement="bottomRight"
      >
        <div
          style={{
            display: "inline-block",
            transition: "transform 0.2s",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <Avatar
            src="https://randomuser.me/api/portraits/men/75.jpg"
            style={{
              border: "2px solid #1890ff",
              width: "5vw",
              height: "5vw",
              maxWidth: "48px",
              maxHeight: "48px",
              minWidth: "38px",
              minHeight: "38px",
            }}
          />
        </div>
      </Dropdown>
    </div>
  );
};

export default ProfileDropdown;
