"use client";
import Avatar from "@/components/shared/avatar";
import React from "react";
import { message, Popconfirm, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { useDeleteUserMutation, useGetAllUserQuery } from "@/Redux/api/userApi";
import { RiDeleteBinLine } from "react-icons/ri";
import { IUser } from "@/Interface/user";

const CustomerComponentPage = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async (id?: string) => {
    if (id) {
      try {
        message.info("Deleting....");
        const result = await deleteUser(id).unwrap();
        if (result?.statusCode === 200 && result?.success) {
          message.success(result?.message);
        } else {
          console.log(result);
        }
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  const customerTablecolumns: TableProps<IUser>["columns"] = [
    {
      title: "Profile",
      dataIndex: "profilePhoto",
      key: "profilePhoto",
      render: (profilePhoto) => (
        <Space size="middle">
          <Avatar src={profilePhoto} />
        </Space>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => <Tag>{role}</Tag>,
    },
    {
      title: "Account Type",
      dataIndex: "accountType",
      key: "accountType",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            placement="top"
            title="Are you sure to delete this user?"
            onConfirm={() => handleDelete(record?._id as string)}
            okText="Yes"
            cancelText="No"
          >
            <button className="text-xl">
              <RiDeleteBinLine />
            </button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const { data } = useGetAllUserQuery({ page: currentPage, limit: pageSize });

  const users = data?.data || [];

  // Separate users into   admins/super_admins
  const customers = users?.filter((user: IUser) => user?.role === "customer");

  return (
    <div>
      <h2 className="font-bold mb-2">Customers</h2>
      <Table
        columns={customerTablecolumns}
        dataSource={customers}
        rowKey="_id"
        pagination={{
          current: currentPage,
          pageSize,
          total: customers.length,
          onChange: (page, pageSize) => {
            setCurrentPage(page);
            if (pageSize) {
              setPageSize(pageSize);
            }
          },
        }}
      />
    </div>
  );
};

export default CustomerComponentPage;
