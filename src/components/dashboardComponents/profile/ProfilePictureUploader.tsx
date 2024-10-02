"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { message, Modal, Button } from "antd";
import { FaCamera } from "react-icons/fa";
import SingleImageUploader from "@/components/shared/inputs/SingleImageUploader";
import { IUser } from "@/Interface/user";
import { useUpdateUserMutation } from "@/Redux/api/userApi";
import { getTokenInfo } from "@/service/auth.service";
import { useAppDispatch } from "@/Redux/hooks";
import { setProfileInfo } from "@/Redux/Slices/authSlice";

const ProfilePictureUploader: React.FC<{ user: IUser }> = ({ user }) => {
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [defaultImgUrl, setDefaultUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user?.profilePhoto) {
      setDefaultUrl(user.profilePhoto);
    }
  }, [user?.profilePhoto]);

  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const tokenInfo = getTokenInfo();
  const id = tokenInfo?.userId;
  const dispatch = useAppDispatch();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleUpdate = async () => {
    const data = new FormData();
    if (!imgFile) {
      return message.error("Please select your profile picture");
    }

    data.append("file", imgFile);
    data.append("data", JSON.stringify({}));

    const res = await updateUser({ data, id }).unwrap();

    if (res?.statusCode === 200) {
      message.success("Profile picture updated successfully!");
      dispatch(setProfileInfo(res.data));
      setIsModalOpen(false);
    } else {
      message.error("Failed to update profile picture");
    }
  };

  return (
    <div>
      <button
        onClick={handleOpenModal}
        className="flex items-center justify-center w-full"
      >
        <div className="w-32 h-32 border-2 border-gray-300 bg-gray-50 rounded-full mb-4 flex items-center justify-center text-gray-500 cursor-pointer relative">
          <button className="absolute bottom-2 right-2 z-10 h-6 w-6 rounded-full bg-white flex items-center justify-center text-md">
            <FaCamera />
          </button>
          {defaultImgUrl ? (
            <Image
              width={128}
              height={128}
              src={defaultImgUrl}
              alt="Default Profile"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <div className="text-center text-sm p-3 text-gray-500">
              Upload profile picture
            </div>
          )}
        </div>
      </button>

      <Modal
        title="Upload Profile Picture"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={[
          <Button key="cancel" onClick={handleCloseModal}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleUpdate}
            loading={isLoading}
          >
            Upload
          </Button>,
        ]}
      >
        <SingleImageUploader
          setImageFile={setImgFile}
          className="w-40 h-40"
          isForProfile
        />
      </Modal>
    </div>
  );
};

export default ProfilePictureUploader;
