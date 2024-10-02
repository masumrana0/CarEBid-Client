/**
 * Title: 'Change Password  Develop By Masum Rana'
 * Description: ''
 * Author: 'Masum Rana'
 * Date: 25-06-2024
 *
 */

"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useChangePasswordMutation } from "@/Redux/api/authApi";
import { IChangePassword } from "@/Interface/auth";
import Form from "@/components/shared/inputs/Form";
import FormInput from "@/components/shared/inputs/FormInput";
import { changePasswordSchema } from "@/schema/auth.schema";
import { Button, message } from "antd";
import { useFormContext } from "react-hook-form";

const ChangePassword: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [changePassword, { isLoading, isError }] = useChangePasswordMutation();

  const handleChange = async (data: IChangePassword) => {
    const { confirmPassword, ...otherPasswords } = data;
    const payloadPassword = { ...otherPasswords };

    changePassword(payloadPassword)
      .then((res: any) => {
        if (res?.data?.statusCode === 200) {
          setErrorMessage(null);
          message.success("Password changed successfully. ");
        } else {
          message.error(res?.error?.message);
          setErrorMessage(res?.error?.message);
        }
      })
      .catch(() => {
        setErrorMessage("An unexpected error occurred");
      });
  };

  return (
    <div className="  py-5 px-5  lg:px-10 w-full    ">
      <Form resolver={changePasswordSchema} submitHandler={handleChange}>
        <div className="space-y-2 ">
          <FormInput
            type="password"
            name="oldPassword"
            placeholder="Enter your old password"
            label="Old Password"
            required
          />
          <FormInput
            type="password"
            name="newPassword"
            placeholder="Enter your new password"
            label="New Password"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            placeholder="Enter your confirm password"
            label="Confirm Password"
            required
          />
          {errorMessage && (
            <p className="text-sm text-red-500 mb-1">{errorMessage}</p>
          )}
        </div>
        <Link
          className="underline text-sm text-green-700 hover:text-green-800 light-darkmode"
          href={"/auth/forgot-password"}
        >
          Forgot Password?
        </Link>
        <div className="mt-5 flex items-center justify-center">
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ChangePassword;
