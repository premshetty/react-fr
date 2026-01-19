import { FileEntity } from "./file-entity";

export type Property = {
  id: string | number;
  title: string;
};

export type PropertyDetails = Property & {
  photos: FileEntity[];
  videos: FileEntity[];
  tags: string[];
  description?: string;
};
