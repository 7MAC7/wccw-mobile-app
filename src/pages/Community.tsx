import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { View, Post } from '../types';

interface CommunityProps {
  user: { username: string } | null;
  onLogin?: () => void;
  onLogout?: () => void;
}

const Community: React.FC<CommunityProps> = ({ user, onLogin, onLogout }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  // 게시물 불러오기
  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const loadedPosts: Post[] = [];
      querySnapshot.forEach((doc) => {
        loadedPosts.push({ id: doc.id, ...doc.data() } as Post);
      });
      setPosts(loadedPosts);
    };
    fetchPosts();
  }, []);

  // 게시물 작성
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !title.trim() || !content.trim()) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'posts'), {
        title,
        content,
        author: user.username,
        date: new Date().toLocaleDateString('ko-KR'),
        createdAt: serverTimestamp(),
      });
      setTitle('');
      setContent('');
      // 다시 불러오기
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const loadedPosts: Post[] = [];
      querySnapshot.forEach((doc) => {
        loadedPosts.push({ id: doc.id, ...doc.data() } as Post);
      });
      setPosts(loadedPosts);
    } catch (error) {
      alert('작성 실패: ' + (error as Error).message);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 pb-20">
      <h1 className="text-3xl font-serif font-bold text-wccw-purple mb-8 tracking-wide text-center">나눔 게시판</h1>

      {/* 로그인 안 됐으면 로그인 유도 */}
      {!user ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-6">글을 작성하려면 로그인이 필요합니다.</p>
          <button onClick={onLogin} className="bg-wccw-purple text-white px-6 py-3 rounded-full">
            로그인 (임시)
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mb-10 bg-white rounded-2xl p-6 shadow-md">
          <input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:border-wccw-purple"
            required
          />
          <textarea
            placeholder="평화의 메시지를 나눠주세요..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 h-32 focus:outline-none focus:border-wccw-purple resize-none"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-wccw-purple text-white font-bold py-3 px-8 rounded-full shadow hover:shadow-lg disabled:opacity-70"
          >
            {loading ? '작성 중...' : '작성하기'}
          </button>
        </form>
      )}

      {/* 게시물 목록 */}
      <div className="space-y-6">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500 py-12">아직 작성된 메시지가 없습니다. 첫 번째 메시지를 남겨주세요.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-wccw-purple mb-2">{post.title}</h3>
              <p className="text-sm text-gray-500 mb-3">
                작성자: {post.author} | {post.date}
              </p>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{post.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Community;