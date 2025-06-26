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
            {
              name: "platform",
              title: "Tên nền tảng",
              type: "string",
              options: {
                list: [
                  { title: "Facebook", value: "facebook" },
                  { title: "Instagram", value: "instagram" },
                  { title: "YouTube", value: "youtube" },
                  { title: "Twitter", value: "twitter" },
                  { title: "TikTok", value: "tiktok" },
                  { title: "WhatsApp", value: "whatsapp" },
                  { title: "Email", value: "email" },
                ],
                layout: "dropdown",
              },
            },
            {
              name: "url",
              title: "Liên kết",
              type: "url",
              description:
                "Dán link mạng xã hội. WhatsApp: https://wa.me/84901234567 — Email: mailto:your@email.com",
              validation: (Rule: any) =>
                Rule.uri({
                  scheme: ["http", "https", "mailto"],
                }),
            },
            {
              name: "enabled",
              title: "Hiển thị?",
              type: "boolean",
              initialValue: true,
            },
          ],
        },
      ],
    },
  ],
};

export default settingsType;
