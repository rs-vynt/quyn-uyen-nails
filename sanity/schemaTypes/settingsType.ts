const settingsType = {
  name: "settings",
  title: "Cài đặt trang (Footer)",
  type: "document",
  fields: [
    {
      name: "storeName",
      title: "Tên tiệm",
      type: "string",
    },
    {
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "description",
      title: "Mô tả ngắn về tiệm",
      type: "text",
    },
    {
      name: "address",
      title: "Địa chỉ",
      type: "string",
    },
    {
      name: "phone",
      title: "Số điện thoại",
      type: "string",
    },
    {
      name: "bookingUrl",
      title: "Liên kết đặt lịch (Fresha)",
      type: "url",
    },
    {
      name: "openingHours",
      title: "Giờ mở cửa",
      type: "text",
    },
    {
      name: "mapEmbedUrl",
      title: "Google Map iframe URL",
      type: "url",
    },
    {
      name: "socials",
      title: "Mạng xã hội",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "platform", type: "string", title: "Tên nền tảng" },
            { name: "url", type: "url", title: "Liên kết" },
          ],
        },
      ],
    },
  ],
};

export default settingsType;
