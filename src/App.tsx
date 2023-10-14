import { PageLayout } from "./components/layout";
import { useRouter } from "./hooks/useRouter";

const App = () => {
  return (
    <div>
      <PageLayout>{useRouter()}</PageLayout>
    </div>
  );
};

export default App;
