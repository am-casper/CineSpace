interface Video {
  _id: string;
  id: string;
  thumbnailPublic: string;
  dislikeCount: number;
  viewsCount: number;
  isKids: boolean;
  uploadedBy: string;
  title: string;
  desc: string;
  videoPublic: string;
  comments: Comment[];
}

interface Comment {
  comment: string;
  dislikeCount: number;
}

export type { Video, Comment };
