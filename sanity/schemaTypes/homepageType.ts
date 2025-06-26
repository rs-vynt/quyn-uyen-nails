const homepageType = {
  name: 'homepage',
  title: 'Trang chủ',
  type: 'document',
  fields: [
    {
      name: 'heroImage',
      title: 'Ảnh nền trang chủ',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'headline',
      title: 'Tiêu đề chính',
      type: 'string',
    },
    {
      name: 'subheadline',
      title: 'Dòng mô tả ngắn',
      type: 'string',
    },
    {
      name: 'aboutText',
      title: 'Giới thiệu tiệm',
      type: 'text',
    },
    {
      name: 'aboutImage',
      title: 'Ảnh minh hoạ phần giới thiệu',
      type: 'image',
      options: { hotspot: true },
    },
  ],
}

export default homepageType
