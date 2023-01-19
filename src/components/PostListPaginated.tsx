import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { getPostsPaginated } from '../api/posts';

export default function PostListPaginated() {
  const [page, setPage] = useState<number | undefined>(1);

  const { data, error, isPreviousData, status } = useQuery({
    queryKey: ['posts', { page }],
    queryFn: () => getPostsPaginated(page || 0),
    keepPreviousData: true,
  });

  if (status === 'loading') return <h1>Loading...</h1>;
  if (status === 'error') return <h1>{JSON.stringify(error)}</h1>;

  return (
    <>
      <h1>
        Post List Paginated
        <br />
        <small>{isPreviousData && 'Previous Data'}</small>
      </h1>
      {data.posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
      {data.previousPage && (
        <button onClick={() => setPage(data.previousPage)}>Previous</button>
      )}{' '}
      {data.nextPage && (
        <button onClick={() => setPage(data.nextPage)}>Next</button>
      )}
    </>
  );
}
