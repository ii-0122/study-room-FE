export interface UpdateStudyRoomFormData {
  title: string;
  tagList?: string[];
  notice?: string;
  isPublic: boolean;
  password?: string;
  isChat?: boolean;
  imageUrl?: string;
}
