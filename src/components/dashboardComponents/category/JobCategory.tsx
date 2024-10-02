"use client";
import React from "react";
import { Table, Collapse, Button, Space, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { IJobCategory } from "@/Interface/job";
import {
  useDeleteJobCategoryMutation,
  useDeleteSubJobCategoryMutation,
  useGetJobCategoriesQuery,
} from "@/Redux/api/jobCategoryApi";

const { Panel } = Collapse;

const JobCategoryDisplay: React.FC = () => {
  // Mutation hook for deleting job categories
  const [deleteJobCategory, { isLoading: loadingDeleteJobCategory }] =
    useDeleteJobCategoryMutation();

  const [deleteSubCategory] = useDeleteSubJobCategoryMutation();

  // Handler for deleting a category
  const handleDeleteCategory = (id: string) => {
    deleteJobCategory(id)
      .unwrap()
      .then((res: any) => {
        if (res?.statusCode === 200) {
          message.success("Job Category deleted successfully");
        } else {
          message.error("Failed to delete");
        }
      });
  };

  const handleDeleteSubCategory = ({ subOptionId, categoryId }: any) => {
    deleteSubCategory({ categoryId, subOptionId })
      .unwrap()
      .then((res: any) => {
        if (res?.statusCode === 200) {
          message.success("Job Category deleted successfully");
        } else {
          message.error("Failed to delete");
        }
      });
  };

  // Define columns for the main categories table
  const columns = [
    {
      title: "Category Label",
      dataIndex: "label",
      key: "label",
    },
    {
      title: "Category Value",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: IJobCategory) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            // Add onClick handler for editing a category
            // onClick={() => onEditCategory(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this category?"
            onConfirm={() => handleDeleteCategory(record._id as string)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Fetch job categories
  const { data, isLoading } = useGetJobCategoriesQuery(null);
  const categories = data?.data;

  return (
    <div className="w-full md:container mx-auto md:my-8 p-2 md:p-5 shadow-md rounded-lg bg-white">
      <h1 className="text-2xl font-bold mb-4">Job Categories</h1>
      <Table
        loading={isLoading || loadingDeleteJobCategory}
        columns={columns}
        dataSource={categories}
        rowKey="value"
        pagination={false}
        expandable={{
          // Define how expandable rows should be rendered
          expandedRowRender: (record) => (
            <Collapse>
              {record?.subOption && record.subOption.length > 0 ? (
                record.subOption.map((sub, index) => (
                  <Panel
                    header={`Sub Category ${index + 1}: ${sub.label}`}
                    key={sub?.value}
                    extra={
                      <Space size="middle">
                        <Button
                          icon={<EditOutlined />}
                          // Add onClick handler for editing a sub-category
                          // onClick={() => onEditSubCategory(record.value, index)}
                        >
                          Edit
                        </Button>
                        <Popconfirm
                          title="Are you sure to delete this sub-category?"
                          // Add onConfirm handler for deleting a sub-category
                          onConfirm={() =>
                            handleDeleteSubCategory({
                              subOptionId: sub?._id as string,
                              categoryId: record?._id as string,
                            })
                          }
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button
                            disabled={record.subOption?.length == 1}
                            icon={<DeleteOutlined />}
                            danger
                          >
                            Delete
                          </Button>
                        </Popconfirm>
                      </Space>
                    }
                  >
                    <p>
                      <strong>Value:</strong> {sub.value}
                    </p>
                    <p>
                      <strong>Minimum Cost:</strong> ${sub.minCost}
                    </p>
                  </Panel>
                ))
              ) : (
                <p>No Sub Categories</p>
              )}
            </Collapse>
          ),
          // Ensure that the function always returns a boolean value
          rowExpandable: (record) => !!record?.subOption?.length,
        }}
      />
    </div>
  );
};

export default JobCategoryDisplay;
