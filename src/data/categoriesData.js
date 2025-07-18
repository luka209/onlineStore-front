import {
  FaLaptop,
  FaKeyboard,
  FaServer,
  FaHdd,
  FaPhotoVideo,
  FaVideo,
} from "react-icons/fa";

export const categories = [
  {
    icon: <FaLaptop />,
    label: "PCs and Laptops",
    subItems: [
      "Apple MacBook",
      "Business Laptop",
      "Gaming Laptop",
      "Gaming PC",
      "Consoles",
    ],
  },
  {
    icon: <FaKeyboard />,
    label: "Computer Accessories",
    subItems: [
      "Monitors",
      "Mouse",
      "Keyboard",
      "Headsets",
      "Dinamics",
      "Mouse Pads",
    ],
  },
  {
    icon: <FaServer />,
    label: "Servers and Components",
    subItems: [
      "Cases",
      "Processors",
      "Graphics Cards",
      "RAM",
      "Power Supply Units",
      "SSD",
      "HDD",
      "CPU Coolers",
      "Case Fans",
      "Thermal Paste",
      "Routers",
      "Cables & Adapters",
      "Disc Drives",
    ],
  },
  {
    icon: <FaHdd />,
    label: "Data Storage Devices",
    subItems: [
      "Optical Disks",
      "USB Flash Drives",
      "Memory Cards",
      "Card Readers",
      "External Hard Drives",
    ],
  },
  {
    icon: <FaPhotoVideo />,
    label: "Multimedia",
    subItems: [
      "Photo & Video Cameras",
      "Camera Accessories",
      "Projectors",
      "Projector Accessories",
    ],
  },
  {
    icon: <FaVideo />,
    label: "Video Surveillance Systems",
    subItems: [
      "Surveillance Cameras",
      "Video Recorders",
      "Surveillance System Accessories",
    ],
  },
];


export const categoriesMap = {
  "PCs and Laptops": [
    "Apple MacBook",
    "Business Laptop",
    "Gaming Laptop",
    "Office PC",
    "Personal PC",
  ],
  "Computer Accessories": [
    "Monitors",
    "Mouse",
    "Keyboard",
    "Headsets",
    "Dinamics",
    "Mouse Pads",
  ],
  "Servers and Components": [
    "Cases",
    "Processors",
    "Graphics Cards",
    "RAM",
    "Power Supply Units",
    "SSD",
    "HDD",
    "CPU Coolers",
    "Case Fans",
    "Thermal Paste",
    "Routers",
    "Cables & Adapters",
    "Disc Drives",
  ],
  "Data Storage Devices": [
    "Optical Disks",
    "USB Flash Drives",
    "Memory Cards",
    "Card Readers",
    "External Hard Drives",
  ],
  Multimedia: [
    "Photo & Video Cameras",
    "Camera Accessories",
    "Projectors",
    "Projector Accessories",
  ],
  "Video Surveillance Systems": [
    "Surveillance Cameras",
    "Video Recorders",
    "Surveillance System Accessories",
  ],
};