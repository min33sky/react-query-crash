import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import './App.css';

const POSTS = [
  {
    id: '1',
    title: 'First Post',
  },
  {
    id: '2',
    title: 'Second Post',
  },
];

function App() {
  const queryClient = useQueryClient();

  const postQuery = useQuery({
    queryKey: ['posts'],
    queryFn: () => wait(1000).then(() => [...POSTS]),
    // queryFn: () => Promise.reject('Error~~~~~~!'),
  });

  const newPostMutation = useMutation({
    mutationFn: (title: string) =>
      wait(1000).then(() =>
        POSTS.push({
          id: crypto.randomUUID(),
          title,
        }),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
  });

  if (postQuery.isLoading) return <h1>Loading...</h1>;
  if (postQuery.isError) return <pre>{JSON.stringify(postQuery.error)}</pre>;

  return (
    <div>
      {postQuery.data.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
      <button
        disabled={newPostMutation.isLoading}
        onClick={() => {
          newPostMutation.mutate('New Post');
        }}
      >
        Add New Post
      </button>
    </div>
  );
}

function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export default App;
