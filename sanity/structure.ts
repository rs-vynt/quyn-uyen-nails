import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Nội dung")
    .items([
      S.documentTypeListItem("homepage").title("Trang chủ"),
      S.documentTypeListItem("service").title("Dịch vụ"),
      S.documentTypeListItem("gallery").title("Bộ sưu tập"),
      S.documentTypeListItem("settings").title("Cài đặt"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          !["homepage", "service", "gallery", "settings"].includes(
            item.getId()!
          )
      ),
    ]);
