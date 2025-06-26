import { type SchemaTypeDefinition } from "sanity";
import serviceType from "./serviceType";
import homepageType from "./homepageType";
import galleryType from "./galleryType";
import settingsType from "./settingsType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [serviceType, homepageType, galleryType, settingsType],
};
