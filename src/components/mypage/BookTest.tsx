//BookTest.tsx
import { useEffect, useState } from 'react';
import { searchBooks } from '../../api/bookApi';
import type { BookResponse } from '../../types/book';

const BookTest = () => {
  const [response, setResponse] = useState<BookResponse | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('한강'); // 기본값으로 테스트

  // testSearch 함수만 수정
  const testSearch = async () => {
    if (!searchTerm.trim()) return alert('검색어를 입력하세요');
    try {
      setLoading(true);
      setError(null);
      
      // 새 API 사용법
      const data = await searchBooks(searchTerm, { page: 1, size: 10 });
      // 또는 searchBooks(searchTerm) 기본값 사용
      
      setResponse(data);
      setBooks(data.items);
      console.table(data.items.slice(0, 5));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(`에러: ${err.message}`);
      console.error('❌ 검색 에러:', err);
    } finally {
      setLoading(false);
    }
  };


  // 마운트 시 자동 첫 검색
  useEffect(() => {
    testSearch();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">📚 API 연결 테스트</h1>
      
      <div className="space-y-4 mb-8 p-6 bg-gray-50 rounded-lg">
        <div className="flex gap-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="책 제목 검색 (예: 한강)"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
          <button
            onClick={testSearch}
            disabled={loading || !searchTerm.trim()}
            className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 disabled:opacity-50 transition-all whitespace-nowrap"
          >
            {loading ? '⏳ 검색중...' : '🔍 검색'}
          </button>
        </div>
        <p className="text-sm text-gray-600">
          💡 curl 예시: <code>http://localhost:8080/api/v1/search/books?query=한강</code>
        </p>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-lg text-blue-600">⏳ API 호출 중...</div>
        </div>
      )}
      
      {error && (
        <div className="p-6 mb-6 bg-red-50 border border-red-200 rounded-lg">
          <div className="text-red-800 font-medium">⚠️ {error}</div>
          <button 
            onClick={() => setError(null)} 
            className="mt-2 text-sm text-red-600 hover:underline"
          >
            다시 시도
          </button>
        </div>
      )}

      {response && (
        <div className="mb-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>📄 페이지: {response.page}</div>
            <div>📊 크기: {response.size}</div>
            <div>📈 총 개수: {response.totalCount?.toLocaleString()}</div>
            <div>🏁 끝: {response.isEnd ? '예' : '아니오'}</div>
          </div>
        </div>
      )}

      {books.length > 0 ? (
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            📚 검색 결과 ({books.length}개)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book, idx) => (
              <div key={book.bookId || idx} className="p-6 bg-white border rounded-lg shadow-sm hover:shadow-md transition-all">
                {book.thumbnailUrl && (
                  <img 
                    src={book.thumbnailUrl} 
                    alt={book.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h3 className="font-bold text-lg line-clamp-2 mb-2">{book.title}</h3>
                <p className="text-gray-600 mb-1">👨‍🎨 {book.authors?.join(', ') || '저자'}</p>
                {book.translators?.length > 0 && (
                  <p className="text-gray-500 text-sm mb-2">📚 {book.translators.join(', ')}</p>
                )}
                <p className="text-xs text-gray-400">
                  📖 {book.publisherName} | {new Date(book.publishedAt).getFullYear()}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : !loading && !error ? (
        <div className="text-center py-12 text-gray-500">
          검색어를 입력하고 버튼을 눌러보세요!
        </div>
      ) : null}
    </div>
  );
};

export default BookTest;
