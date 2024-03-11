export type DataResponseType = {
  data: Data;
};

export type Data = {
  user: User;
};

export type User = {
  posts: Posts;
};

export type Posts = {
  edges: Edge[];
};

export type Edge = {
  node: Node;
};

export type Node = {
  title: string;
  url: string;
  publishedAt: Date;
  readTimeInMinutes: number;
  coverImage: CoverImage;
  tags: Tag[];
};

export type CoverImage = {
  url: string;
};

export type Tag = {
  name: string;
};
