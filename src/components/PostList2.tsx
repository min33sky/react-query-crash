import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../api/posts';

export default function PostList2() {
  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  if (postsQuery.isLoading) return <h1>Loading...</h1>;
  if (postsQuery.isError)
    return <h1>Error: {JSON.stringify(postsQuery.error)}</h1>;

  return (
    <div>
      <h1>PostList2</h1>
      <ol>
        {postsQuery.data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </div>
  );
}
