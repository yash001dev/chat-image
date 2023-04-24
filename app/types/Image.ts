export type ImageType = {
  url: string;
  id: number;
  createdAt: string;
  users: {
    name: string;
    image: string;
  };
  Comments?: {
    createdAt: string;
    id: number;
    body: string;
  }[];
};
