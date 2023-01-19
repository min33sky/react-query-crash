import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getPost } from './api/posts';
import { getUser } from './api/users';

export default function Post({ id }: { id: number }) {
  const postQuery = useQuery({
    queryKey: ['posts', id],
    queryFn: () => getPost(id),
  });

  const userQuery = useQuery({
    queryKey: ['users', postQuery?.data?.userId],
    queryFn: () => getUser(postQuery.data.userId),
    enabled: !!postQuery?.data?.userId,
  });

  if (postQuery.status === 'loading') return <h1>Loading...</h1>;
  if (postQuery.status === 'error') {
    return <h1>{JSON.stringify(postQuery.error)}</h1>;
  }

  return (
    <>
      <h1>
        {postQuery.data.title} <br />
        <small>
          {userQuery.isLoading
            ? 'Loading User...'
            : userQuery.isError
            ? 'Error Loading User'
            : userQuery.data.name}
        </small>
      </h1>
      <p>{postQuery.data.body}</p>
    </>
  );
}
