// icons
import { AiOutlineStock } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { IoMailSharp } from "react-icons/io5";

import { AiFillProject } from "react-icons/ai";
import { FaCartPlus, FaUserCircle } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import { TbBrandProducthunt, TbSettings } from "react-icons/tb";
import { MdOutlineCategory, MdWork } from "react-icons/md";

// interface
import { IDNavMenuItem } from "@/Interface/content";
import { MdOutlineLocalOffer } from "react-icons/md";

export const DAdminAccountNavigation: IDNavMenuItem[] = [
  { icon: <RxDashboard />, label: "DashBoard", route: "/admin" },
  { icon: <FaUserCircle />, label: "Profile", route: "/admin/profile" },
  {
    icon: <IoIosPeople />,
    label: "User",
    children: [
      {
        label: "Create user",
        route: "/admin/user/create-user",
      },
      {
        label: "Admin",
        route: "/admin/user/admin",
      },
      {
        label: "Customer",
        route: "/admin/user/customer",
      },
    ],
  },
  {
    icon: <MdOutlineCategory />,
    label: "Category",
    children: [
      {
        label: "Job Category",
        route: "/admin/category/job-category",
      },
      {
        label: "Create Job Category",
        route: "/admin/category/create-job-category",
      },
    ],
  },
  {
    icon: <MdWork />,
    label: "Job",
    children: [
      {
        label: "Create-Job",
        route: "/admin/jobs/create-job",
      },
      {
        label: "Pending Job",
        route: "/admin/jobs/pending-job",
      },
      {
        label: "Running Job",
        route: "/admin/jobs/running-job",
      },
      {
        label: "Cancel Job",
        route: "/admin/jobs/cancel-job",
      },
      {
        label: "Old Job",
        route: "/admin/jobs/old-job",
      },
      {
        label: "Reject Job",
        route: "/admin/jobs/reject-job",
      },
    ],
  },
  {
    icon: <MdWork />,
    label: "Work",
    children: [
      {
        label: "Work-Review",
        route: "/admin/work/work-review",
      },
      {
        label: "Completed-Work",
        route: "/admin/work/completed-work",
      },
      {
        label: "Reject-Work",
        route: "/admin/work/reject-work",
      },
    ],
  },
  {
    icon: <FaPeopleGroup />,
    label: "Web Contents",
    children: [
      {
        label: "Header Carousel",
        route: "/admin/web-content/header-carousel",
      },
      {
        label: "Create header Carousel",
        route: "/admin/web-content/header-carousel/create-header-carousel",
      },
    ],
  },
  {
    icon: <MdOutlineLocalOffer />,
    label: "Offer",
    children: [
      { label: "Offers", route: "/admin/offer" },
      { label: "Create Offer", route: "/admin/offer/create-offer" },
    ],
  },

  {
    icon: <TbBrandProducthunt />,
    label: "Product",
    children: [
      { label: "Product", route: "/admin/product" },
      { label: "Create Product", route: "/admin/product/create-product" },
    ],
  },
  { icon: <FaCartPlus />, label: "Sales", route: "/admin/sales" },
  { icon: <AiOutlineStock />, label: "Stock", route: "/admin/stock" },
  { icon: <AiFillProject />, label: "Project", route: "/admin/project" },
  { icon: <IoMailSharp />, label: "Mailbox", route: "/admin/mailbox" },
  { icon: <TbSettings />, label: "Settings", route: "/admin/settings" },
];

export const DBusinessAccountNavigation: IDNavMenuItem[] = [
  { icon: <RxDashboard />, label: "DashBoard", route: "/business" },
  { icon: <FaUserCircle />, label: "Profile", route: "/business/profile" },
  {
    icon: <MdWork />,
    label: "Job",
    children: [
      {
        label: "Create-Job",
        route: "/business/jobs/create-job",
      },
      {
        label: "Pending Job",
        route: "/business/jobs/pending-job",
      },
      {
        label: "Running Job",
        route: "/business/jobs/running-job",
      },
      {
        label: "Cancel Job",
        route: "/business/jobs/cancel-job",
      },
      {
        label: "Old Job",
        route: "/business/jobs/old-job",
      },
      {
        label: "Reject Job",
        route: "/business/jobs/reject-job",
      },
    ],
  },
  {
    icon: <MdOutlineLocalOffer />,
    label: "Offer",
    children: [
      { label: "My Offers", route: "/business/offer" },
      { label: "Create Offer", route: "/business/offer/create-offer" },
    ],
  },
  {
    icon: <TbBrandProducthunt />,
    label: "Product",
    children: [
      { label: "My Product", route: "/business/product" },
      { label: "Create Product", route: "/business/product/create-product" },
    ],
  },
];

export const DPersonalAccountNavigation: IDNavMenuItem[] = [
  { icon: <RxDashboard />, label: "DashBoard", route: "/personal" },
  { icon: <FaUserCircle />, label: "Profile", route: "/personal/profile" },
  {
    icon: <MdOutlineLocalOffer />,
    label: "Offer",
    route: "/personal/offer",
  },

  { icon: <TbBrandProducthunt />, label: "Shop", route: "/personal/product" },
];

export const getMenuContent = (tokenInfo: any) => {
  if (tokenInfo?.role === "admin" || tokenInfo?.role === "super_admin") {
    return DAdminAccountNavigation;
  }
  if (tokenInfo?.accountType === "business") {
    return DBusinessAccountNavigation;
  }
  if (tokenInfo?.accountType === "personal") {
    return DPersonalAccountNavigation;
  }
  return [];
};
