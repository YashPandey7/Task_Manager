import { Nav } from "./components/AppBar";
import { Container } from "@mui/material";
import { TaskManager } from "./components/TaskManager";

function App() {
  return (
    <>
      <Nav/>
      <Container maxWidth="lg">
        <TaskManager />
      </Container>
    </>
  );
}

export default App;
