import React from "react";

const AuthorBookBrief: React.FC = () => {
  const mockBooks = [
    { id: "b1", title: "책 제목", thumbnailUrl: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791194530817.jpg", author: "저자명", publisher: "출판사" },
    { id: "b2", title: "책 제목", thumbnailUrl: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791194530817.jpg", author: "저자명", publisher: "출판사" },
    { id: "b3", title: "책 제목", thumbnailUrl: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791194530817.jpg", author: "저자명", publisher: "출판사" },
    { id: "b4", title: "책 제목", thumbnailUrl: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791194530817.jpg", author: "저자명", publisher: "출판사" },
  ];

  return (
    <section className="w-full bg-gray-100 rounded-[12px]">
      <div className="p-3">
        <div className="flex gap-4 overflow-x-auto no-scrollbar w-full">
          {mockBooks.slice(0, 3).map((book) => (
            <div key={book.id} className="flex items-center gap-[10px] flex-shrink-0">
              <div className="w-[30px] h-[45px] rounded-[4px] overflow-hidden flex items-center justify-center flex-shrink-0">
                <img 
                  src={book.thumbnailUrl} 
                  alt={book.title}
                  className="w-full h-full object-cover" 
                />
              </div>

              <div className="flex flex-col flex-1 min-w-0">
                <p className="text-subtitle-02-sb text-black line-clamp-2">
                  {book.title}
                </p>
                <p className="text-caption-02 text-gray-600 truncate">
                  {book.author}
                  <span className="text-gray-400 px-1"> | </span>
                  {book.publisher}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuthorBookBrief;
