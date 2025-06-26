interface Props {
  categories: string[];
  activeCategory: string | null;
  onSelect: (category: string | null) => void;
}

export default function CategoryFilter({ categories, activeCategory, onSelect }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-10">
      <button
        onClick={() => onSelect(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium border transition cursor-pointer ${
          !activeCategory
            ? "bg-pink-500 text-white"
            : "bg-white text-gray-700 border-gray-300"
        } hover:bg-pink-100`}
      >
        Alles
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition cursor-pointer ${
            activeCategory === cat
              ? "bg-pink-500 text-white"
              : "bg-white text-gray-700 border-gray-300"
          } hover:bg-pink-100`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
