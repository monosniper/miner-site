import { PageLayout } from "./components/layout";
import { useRouter } from "./hooks/useRouter";

const App = () => {
  return (
    <div>
      <div className="container">
        <PageLayout>{useRouter()}</PageLayout>
      </div>
    </div>
  );
};

export default App;
