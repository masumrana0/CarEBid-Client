import { Modal, Button, message } from "antd";
import Form from "@/components/shared/inputs/Form";
import FormInput from "@/components/shared/inputs/FormInput";
import { useUpdateUserMutation } from "@/Redux/api/userApi";
import { getTokenInfo, Logout } from "@/service/auth.service";
import { useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { IChangeEmail } from "@/Interface/auth";
import { changeEmailSchema } from "@/schema/auth.schema";
import { useFormContext } from "react-hook-form";
import { useChangeEmailMutation } from "@/Redux/api/authApi";
import { useAppDispatch } from "@/Redux/hooks";
import { setIsLoggedIn, setProfileInfo } from "@/Redux/Slices/authSlice";
import { removeFromLocalStorage } from "@/utils/local-storage";
import { authInfoKey } from "@/constant/storegeKey";

const UpdateEmail = () => {
  const [isOpen, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [changeEmail, { isLoading }] = useChangeEmailMutation();
  const dispatch = useAppDispatch();

  // Handle Modal open/close
  const toggleModal = () => {
    setOpen(!isOpen);
  };

  const handleUpdate = async (data: IChangeEmail) => {
    changeEmail(data)
      .unwrap()
      .then((res: any) => {
        console.log(res);
        if (res?.statusCode === 200) {
          setErrorMessage(null);
          message.success(
            "Email updated successfully.Please check your inbox.",
          );
          const { user, token } = res?.data;
          localStorage.removeItem(authInfoKey);
          dispatch(setProfileInfo(user));
          dispatch(setIsLoggedIn(token?.accessToken));
          toggleModal();
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
    <div>
      <Button
        type="text"
        icon={<FaPencil />}
        onClick={toggleModal}
        className="text-xs sm:text-sm"
      />

      <Modal
        width={400}
        title="Update Email"
        open={isOpen}
        onCancel={toggleModal}
        footer={null}
        confirmLoading={isLoading}
      >
        <div>
          <Form resolver={changeEmailSchema} submitHandler={handleUpdate}>
            <div className="mt-5 mb-3">
              <FormInput
                name="password"
                type="password"
                placeholder="Enter your password"
                label="Password"
                required
              />
            </div>
            <div className="mt-5 mb-3">
              <FormInput
                name="email"
                type="email"
                placeholder="example@email.com"
                label="New Email"
                required
              />
            </div>
            {errorMessage && (
              <p className="text-sm text-red-500 mb-1">{errorMessage}</p>
            )}
            <Button type="primary" htmlType="submit" block loading={isLoading}>
              Update
            </Button>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateEmail;
