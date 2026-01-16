import type React from "react";

export type BookLog = {
  id: number;
  userName: string;
  userId: string;
  content: string;
  uploadImg: boolean;
  tags: Array<string>;
  UserIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

