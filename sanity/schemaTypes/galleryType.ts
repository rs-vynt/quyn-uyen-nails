import { Rule } from 'sanity';

const galleryType = {
  name: 'gallery',
  title: 'Bộ sưu tập mẫu',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Tên mẫu',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Ảnh mẫu',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: Rule) => Rule.required().error('Ảnh là bắt buộc'),
    },
    {
      name: 'category',
      title: 'Danh mục mẫu (tuỳ chọn)',
      type: 'string',
      options: {
        list: [
          { title: 'Handen', value: 'handen' },
          { title: 'Voeten', value: 'voeten' },
          { title: 'Design', value: 'design' },
        ],
        layout: 'dropdown',
      },
    },
    {
      name: 'priority',
      title: 'Mức độ ưu tiên',
      type: 'number',
      description: 'Số càng lớn thì dịch vụ càng được ưu tiên hiển thị lên trước (mặc định là 0)',
      initialValue: 0,
      validation: (Rule: Rule) => Rule.min(0).max(10).integer().error('Mức độ ưu tiên phải là số nguyên từ 0 đến 10'),
    },
    {
      name: 'relatedService',
      title: 'Liên kết dịch vụ (nếu có)',
      type: 'reference',
      to: [{ type: 'service' }],
      description: 'Chọn một dịch vụ liên quan nếu ảnh này minh họa cho dịch vụ đó.',
    },
  ],
};

export default galleryType;
