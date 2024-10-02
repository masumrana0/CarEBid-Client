"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
// components
import Form from "@/components/shared/inputs/Form";
import FormInput from "@/components/shared/inputs/FormInput";
import FormTextArea from "@/components/shared/inputs/FormTextArea";
import SingleImageUploader from "@/components/shared/inputs/SingleImageUploader";
import LoadingSpinner from "@/components/shared/spinners/loadingSpinner";
import { IHeaderCarouselSlide } from "@/Interface/sliders";
import { webContentValidation } from "@/schema/web-content";

// redux
import { useCreateHeaderSlideMutation } from "@/Redux/api/web_content/headerCarouselApi";
// icon
import { IoIosCreate } from "react-icons/io";

const CreateHeaderCarouselPage = () => {
  const [imageFile, setImageFile] = useState<any | null>(null);
  const [uploadedImgsUrl, setUploadedImagesUrl] = useState<string | null>(null);
  const [data, setData] = useState<IHeaderCarouselSlide | null>(null);
  const imgbb_api_key = "e76b695c8c9d3f4bfa293469ec3905ed";
  const image_hosting_url = `https://api.imgbb.com/1/upload?key=${imgbb_api_key}`;

  const [createSlide, { isLoading }] = useCreateHeaderSlideMutation();

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
        setData({ ...formData, slideBanner: imageUrl });
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
          const result = await createSlide(data);
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
  }, [uploadedImgsUrl, data, createSlide]);

  return (
    <div className=" w-full md:w-[90%] lg:w-[50%]  mx-auto shadow-2xl bg-blue-50 p-5 rounded-lg relative ">
      {isLoading && <LoadingSpinner />}
      <h2 className="font-bold text-lg md:text-2xl flex items-center mb-10">
        <span className="text-xl lg:text-3xl">
          <IoIosCreate />
        </span>{" "}
        Create Header Carousel
      </h2>
      <Form
        resolver={webContentValidation.headerCarouselYupValidationSchema}
        submitHandler={onSubmit}
      >
        <div>
          <FormInput
            name="slideTitle"
            placeholder="Enter your card title"
            required
            label="Card Title"
          />
        </div>

        <div className="flex items-center flex-col md:flex-row gap-5 md:gap-10   mt-5">
          <FormInput
            name="slideButton.label"
            placeholder="Enter your slide button label"
            required
            label="Slide Button Label"
          />

          <FormInput
            name="slideButton.link"
            placeholder="Enter your slide button link"
            required
            label="Slide Button Link"
          />
        </div>

        <div className="mt-1">
          <SingleImageUploader
            setImageFile={setImageFile}
            className="lg:h-52 h-32 w-full"
          />
        </div>

        <div>
          <FormTextArea
            className="h-20 md:h-32"
            name="slideText"
            placeholder="Enter your card details"
            label="Card Details"
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

export default CreateHeaderCarouselPage;
