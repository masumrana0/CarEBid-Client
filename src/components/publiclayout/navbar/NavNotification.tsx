"use client";
import React, { useState } from "react";
import { Dropdown, List, Badge } from "antd";
import { AiOutlineBell } from "react-icons/ai";

const dummyNotifications = [
  {
    id: 1,
    title: "Outbid on Ford Mustang",
    description: "Your bid on Ford Mustang has been outbid by another user.",
    time: "2 minutes ago",
  },
  {
    id: 2,
    title: "New Auction: Tesla Model S",
    description: "A new auction has started for Tesla Model S. Check it out!",
    time: "15 minutes ago",
  },
  {
    id: 3,
    title: "Auction Ended: BMW X5",
    description:
      "The auction for BMW X5 has ended. You were not the highest bidder.",
    time: "1 hour ago",
  },
  {
    id: 4,
    title: "Bid Won: Audi A6",
    description: "Congratulations! You won the auction for Audi A6.",
    time: "3 hours ago",
  },
];

const NotificationDropdown: React.FC = () => {
  const [notifications] = useState(dummyNotifications);
  const unreadCount = notifications.length;

  const menuItems = notifications.map((item) => ({
    key: item.id,
    label: (
      <div className="py-2 px-0 hover:bg-gray-100 transition-all cursor-pointer">
        <strong className="text-sm">{item.title}</strong>
        <p className="text-xs text-gray-600">{item.description}</p>
        <span className="text-xs text-gray-400">{item.time}</span>
      </div>
    ),
  }));

  return (
    <div className="flex items-center space-x-3">
      <Dropdown
        menu={{ items: menuItems }}
        trigger={["click"]}
        placement="bottomRight"
      >
        <Badge count={unreadCount} overflowCount={9} className="cursor-pointer">
          <AiOutlineBell
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            className="text-2xl  transition-all duration-200 cursor-pointer"
          />
        </Badge>
      </Dropdown>
    </div>
  );
};

export default NotificationDropdown;
