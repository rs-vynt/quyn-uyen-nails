import { Rule } from 'sanity';

const serviceType = {
  name: 'service',
  title: 'Dịch vụ',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Tên dịch vụ',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().error('Tên dịch vụ là bắt buộc'),
    },
    {
      name: 'description',
      title: 'Mô tả ngắn',
      type: 'text',
    },
    {
      name: 'price',
      title: 'Giá (€)',
      type: 'number',
    },
    {
      name: 'priceText',
      title: 'Giá hiển thị (tuỳ chọn)',
      type: 'string',
      description: 'Nếu muốn hiển thị giá linh hoạt như "From €5" thì điền ở đây',
    },
    {
      name: 'image',
      title: 'Ảnh minh họa',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'category',
      title: 'Danh mục dịch vụ',
      type: 'string',
      options: {
        list: [
          { title: 'Handen', value: 'handen' },
          { title: 'Voeten', value: 'voeten' },
          { title: 'Design', value: 'design' },
        ],
        layout: 'dropdown',
      },
      description: 'Tùy chọn. Nếu chọn, dịch vụ sẽ được phân loại theo danh mục.',
    },
    {
      name: 'priority',
      title: 'Mức độ ưu tiên',
      type: 'number',
      description: 'Số càng lớn thì dịch vụ càng được ưu tiên hiển thị lên trước (mặc định là 0)',
      initialValue: 0,
      validation: (Rule: Rule) => Rule.min(0).max(10).integer().error('Mức độ ưu tiên phải là số nguyên từ 0 đến 10'),
    },
  ],
};

export default serviceType;
