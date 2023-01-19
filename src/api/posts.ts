import axios from 'axios';

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

const postsClient = axios.create({
  baseURL: 'http://localhost:8080',
});

export async function getPosts() {
  const response = await postsClient.get<Post[]>('/posts', {
    params: {
      _sort: 'title',
    },
  });
  return response.data;
}

export async function getPostsPaginated(page: number) {
  const response = await postsClient.get('', {
    params: {
      _page: page,
      _sort: 'title',
      _limit: 2,
    },
  });

  const hasNext =
    page * 2 <= parseInt(response.headers['x-total-count'] || '0', 10);

  return {
    posts: response.data,
    nextPage: hasNext ? page + 1 : undefined,
    previousPage: page > 1 ? page - 1 : undefined,
  };
}

export async function getPost(id: number) {
  const response = await postsClient.get(`/posts/${id}`);
  return response.data;
}

export async function createPost({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  const response = await postsClient.post<Post>('/posts', {
    title,
    body,
    userId: 1,
    id: Date.now(),
  });
  return response.data;
}
