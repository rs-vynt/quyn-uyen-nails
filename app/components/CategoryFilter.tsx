interface Props {
  categories: string[];
  activeCategory: string | null;
  onSelect: (category: string | null) => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onSelect,
}: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-10">
      <button
        onClick={() => onSelect(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium border transition cursor-pointer ${
          !activeCategory
            ? "bg-[#6F4D38] text-[#ECE2D0] border-[#A07856]"
            : "bg-[#ECE2D0] text-[#3D211A] border-[#CBB799]"
        } hover:bg-[#CBB799]/40`}
      >
        Alles
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition cursor-pointer ${
            activeCategory === cat
              ? "bg-[#6F4D38] text-[#ECE2D0] border-[#A07856]"
              : "bg-[#ECE2D0] text-[#3D211A] border-[#CBB799]"
          } hover:bg-[#CBB799]/40`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
