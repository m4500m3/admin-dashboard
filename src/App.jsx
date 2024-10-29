import TanstackQueryProvider from "./providers/TanstackQueryProvider";
import Router from "./router/Router";
import { AuthProvider } from "./contexts/AuthContext";
import { ProductProvider } from "./contexts/ProductContext"; // Adjust the path

function App() {
  return (
    <TanstackQueryProvider>
      <AuthProvider>
        <ProductProvider>
          <Router />
        </ProductProvider>
      </AuthProvider>
    </TanstackQueryProvider>
  );
}

export default App;
