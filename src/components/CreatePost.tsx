import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useRef } from 'react';
import { createPost } from '../api/posts';
import Post from '../Post';

export default function CreatePost({
  setCurrentPage,
}: {
  setCurrentPage: React.Dispatch<React.SetStateAction<JSX.Element>>;
}) {
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data: any) => {
      console.log('성공: ', data);
      queryClient.setQueryData(['posts', data.id], data);
      queryClient.invalidateQueries(['posts'], { exact: true });
      setCurrentPage(<Post id={data.id} />);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPostMutation.mutate({
      title: titleRef.current?.value || '',
      body: bodyRef.current?.value || '',
    });
  };

  return (
    <div>
      {createPostMutation.isError && JSON.stringify(createPostMutation.error)}
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" ref={titleRef} />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <input type="text" id="body" ref={bodyRef} />
        </div>
        <button>Create</button>
      </form>
    </div>
  );
}
