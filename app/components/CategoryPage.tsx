import { client } from "@/sanity/lib/client";
import ServiceList from "./ServiceList";
import Gallery from "./Gallery";

interface Props {
  category: string;
}

const allowedCategories = ["handen", "voeten", "design"];

const categoryLabels: Record<string, string> = {
  handen: "Handverzorging",
  voeten: "Voetverzorging",
  design: "Nagel Design",
};

export default async function CategoryPage({ category }: Props) {
  const safeCategory = decodeURIComponent(category);

  if (!allowedCategories.includes(safeCategory)) {
    return (
      <div className="text-center mt-20 text-red-500 text-lg">
        Categorie niet gevonden.
      </div>
    );
  }

  return (
    <section className="pt-32 pb-20 bg-[#ECE2D0]">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-[#3D211A] text-center mb-2">
          {categoryLabels[safeCategory]}
        </h1>
        <p className="text-center text-[#6F4D38] max-w-xl mx-auto mb-10">
          Onze premium diensten voor jouw {categoryLabels[safeCategory].toLowerCase()}.
        </p>

        <ServiceList category={safeCategory} />
        <Gallery category={safeCategory} />
      </div>
    </section>
  );
}
