import type React from "react";

export type Book = {
  id: number;
  title: string;
  author: string;
  publisher: string;
  createdAt: string | Date;
  progress: number;
  coverUrl?: never;
  CoverIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export type Author = {
  id: string;
  name: string;
  role: string;
  country: string;
  imageUrl?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  books?: Book[];        
};
