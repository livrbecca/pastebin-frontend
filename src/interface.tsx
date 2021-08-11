export interface TextToLinkProps {
  paste_id: number;
  text: string;
  title: string;
}

export interface FinalDataProps {
  text: string;
  data: string;
}

export interface CommentsProps {
  comment_id: number;
  comment: string;
  paste_id: number;
}

export interface ElementProps {
  element: TextToLinkProps;
}
