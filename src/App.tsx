import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { getPost } from './api/posts';
import './App.css';
import CreatePost from './components/CreatePost';
import PostList1 from './components/PostList1';
import PostList2 from './components/PostList2';
import PostListInfinite from './components/PostListInfinite';
import PostListPaginated from './components/PostListPaginated';
import Post from './Post';

//? queryKey Example
// /posts -> ['posts']
// /posts/1 -> ['posts', post.id]
// /posts?authorId=1 -> ['posts', { authorId: 1 }]
// /posts/1/comments -> ['posts', post.id, 'comments']

function App() {
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(<PostList1 />);

  const onHoverPostOneLink = () => {
    queryClient.prefetchQuery({
      queryKey: ['posts', 1],
      queryFn: () => getPost(1),
    });
  };

  return (
    <div>
      <button onClick={() => setCurrentPage(<PostList1 />)}>Posts List1</button>
      <button onClick={() => setCurrentPage(<PostList2 />)}>Posts List2</button>
      <button onClick={() => setCurrentPage(<Post id={1} />)}>
        First Post
      </button>
      <button
        onClick={() =>
          setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)
        }
      >
        New Post
      </button>
      <button onClick={() => setCurrentPage(<PostListPaginated />)}>
        Post List Paginated
      </button>
      <button onClick={() => setCurrentPage(<PostListInfinite />)}>
        Post List Infinite
      </button>
      <br />

      <div>{currentPage}</div>
    </div>
  );
}

export default App;
