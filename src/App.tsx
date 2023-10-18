import { Suspense } from "react";
import "./App.css";
import {
  QueryClient,
  QueryClientProvider,
  useSuspenseQuery,
} from "@tanstack/react-query";

type GithubRepository = {
  id: number;
  name: string;
  full_name: string;
  owner: {
    avatar_url: string;
  };
};

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<p>読み込み中</p>}>
        <GithubRepository repository="TanStack/query" />
      </Suspense>
    </QueryClientProvider>
  );
}
export default App;

const GithubRepository = ({ repository }: { repository: string }) => {
  const { data } = useSuspenseQuery<GithubRepository>({
    queryKey: ["githubRepository"],
    queryFn: () =>
      fetch(`https://api.github.com/repos/${repository}`).then((res) =>
        res.json()
      ),
  });

  return (
    <div>
      <h2>GitHub Repository Detail</h2>
      <h3>{data.full_name}</h3>
      <ul>
        <li>id: {data.id}</li>
        <li>name: {data.name}</li>
      </ul>
      <img src={data.owner.avatar_url} />
    </div>
  );
};
