"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
// components
import Form from "@/components/shared/inputs/Form";
import FormInput from "@/components/shared/inputs/FormInput";
import SingleImageUploader from "@/components/shared/inputs/SingleImageUploader";
import LoadingSpinner from "@/components/shared/spinners/loadingSpinner";
import { IProduct } from "@/Interface/product";

// redux rtk
import { useCreateProductMutation } from "@/Redux/api/productApi";
// icon
import { IoIosCreate } from "react-icons/io";
import FormSelect from "@/components/shared/inputs/FormSelect";

const CreateProductComponentPage = () => {
  const [category, setCategory] = useState(null);
  const [status, setStatus] = useState(null);
  const [imageFile, setImageFile] = useState<any | null>(null);
  const [uploadedImgsUrl, setUploadedImagesUrl] = useState<string | null>(null);
  const [data, setData] = useState<IProduct | null>(null);
  const imgbb_api_key = "e76b695c8c9d3f4bfa293469ec3905ed";
  const image_hosting_url = `https://api.imgbb.com/1/upload?key=${imgbb_api_key}`;

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const onSubmit = async (formData: any) => {
    try {
      if (!imageFile) {
        return toast.error("No image file selected.");
      }
      const imgFormData = new FormData();
      imgFormData.append("image", imageFile);
      const imageResponse = await axios.post(image_hosting_url, imgFormData);
      if (imageResponse.data.success) {
        const imageUrl = imageResponse.data.data.display_url;
        setUploadedImagesUrl(imageUrl);
        setData({ ...formData, photo: imageUrl, category: category });
      } else {
        return toast.error("Failed to upload image.");
      }
    } catch (error) {
      toast.error("Failed to upload image.");
    }
  };

  useEffect(() => {
    const create = async () => {
      if (data && uploadedImgsUrl) {
        try {
          const result = await createProduct(data);
          if (result?.data?.statusCode === 200) {
            toast.success("Slide Created Successfully");
          } else {
            toast.error("Failed to create Slide.");
          }
        } catch (error) {
          toast.error("Failed to create Slide.");
        }
      }
    };

    create();
  }, [uploadedImgsUrl, data, createProduct]);

  return (
    <div className=" w-full md:w-[90%] lg:w-[50%]  mx-auto shadow-2xl bg-blue-50 p-5 rounded-lg relative ">
      {isLoading && <LoadingSpinner />}
      <h2 className="font-bold text-lg md:text-2xl flex items-center mb-10">
        <span className="text-xl lg:text-3xl">
          <IoIosCreate />
        </span>{" "}
        Create Product
      </h2>
      <Form submitHandler={onSubmit}>
        <div>
          <FormSelect
            setValue={setCategory}
            options={[{ label: "SmartPhone", value: "smartphone" }]}
            placeholder="Select Category"
            required
            label="Category"
          />
        </div>
        <div className="mt-5">
          <FormInput
            name="title"
            placeholder="Enter your product title "
            required
            label="Product Name"
          />
        </div>

        <div className="flex items-center flex-col md:flex-row gap-5 md:gap-10   mt-5">
          <FormInput
            type="number"
            name="price"
            placeholder="Enter your product Price "
            required
            label="Product Price"
          />
          <FormInput
            type="number"
            name="emi"
            placeholder="Enter your product emi "
            required
            label="Product Emi"
          />
        </div>
        <div className="mt-5">
          <FormInput
            name="company"
            placeholder="Enter your company"
            required
            label="company"
          />
        </div>

        <div className="mt-1">
          <SingleImageUploader
            setImageFile={setImageFile}
            className="h-60  w-44"
          />
        </div>

        <div>
          <FormSelect
            setValue={setStatus}
            options={[
              { label: "In Stock", value: "in stock" },
              { label: "Out Of Stock", value: "out of stock" },
            ]}
            placeholder="Select Category"
            required
            label="Status"
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

export default CreateProductComponentPage;
