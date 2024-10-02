"use client";
import { useState } from "react";
import { message } from "antd";
import { IoIosCreate } from "react-icons/io";

// Components
import Form from "@/components/shared/inputs/Form";
import FormInput from "@/components/shared/inputs/FormInput";
import FormSelect from "@/components/shared/inputs/FormSelect";
import LoadingSpinner from "@/components/shared/spinners/loadingSpinner";

// Redux
import { useCreateUserMutation } from "@/Redux/api/userApi";

const CreateUserComponentPage = () => {
  const [role, setRole] = useState<string | null>(null);
  const [customerType, setCustomerType] = useState<string | null>(null);
  const [createUser, { isLoading }] = useCreateUserMutation();

  const onSubmit = async (formData: any) => {
    if (!role) {
      return message.error("Role is required. Please select a role.");
    }

    if (role === "customer" && !customerType) {
      return message.error(
        "Customer type is required. Please select a customer type.",
      );
    }

    const allData = {
      role,
      ...(role === "customer" && { accountType: customerType }),
      ...formData,
    };

    try {
      message.loading("Creating user...");
      const result = await createUser(allData).unwrap();

      if (result?.statusCode === 200) {
        message.success("User created successfully.");
      } else {
        message.error("Failed to create user.");
      }
    } catch (error) {
      message.error("Failed to create user. Please try again.");
    }
  };

  return (
    <div className="w-full md:w-[90%] lg:w-[50%] mx-auto shadow-2xl bg-blue-50 p-5 md:p-10 rounded-lg relative">
      {isLoading && <LoadingSpinner />}
      <h2 className="font-bold text-lg md:text-2xl flex items-center mb-10">
        <IoIosCreate className="text-xl lg:text-3xl" /> Create User
      </h2>
      <Form submitHandler={onSubmit}>
        <div>
          <FormSelect
            setValue={setRole}
            options={[
              { label: "Customer", value: "customer" },
              { label: "Admin", value: "admin" },
            ]}
            placeholder="Select role"
            required
            label="User Role"
          />
        </div>

        {role === "customer" && (
          <div className="mt-5">
            <FormSelect
              setValue={setCustomerType}
              options={[
                { label: "Personal", value: "personal" },
                { label: "Business", value: "business" },
              ]}
              placeholder="Select customer type"
              required
              label="Customer Type"
            />
          </div>
        )}

        <div className="mt-5">
          <FormInput
            type="text"
            name="name"
            placeholder="Enter user name"
            required
            label="User Name"
          />
        </div>

        <div className="mt-5">
          <FormInput
            type="email"
            name="email"
            placeholder="Enter user email"
            required
            label="User Email"
          />
        </div>

        <div className="mt-5">
          <FormInput
            type="text"
            name="contactNo"
            placeholder="Enter user contact number"
            required
            label="User Contact No."
          />
        </div>

        <div className="mt-5">
          <FormInput
            type="password"
            name="password"
            placeholder="Enter user password"
            required
            label="User Password"
          />
        </div>

        <div className="flex items-center justify-center md:justify-end mt-5">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create"}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default CreateUserComponentPage;
