
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import Header from './Components/Header';
import Footer from './Components/Footer';
import { AuthProvider } from "./AuthContext";
import Layout from "./Components/Layout";
import { useLoader } from "./Components/Shared/UseLoader";

function useShouldShowLayout() {
  const location = useLocation();
  const pathsWithoutLayout = ["/Login", "/Register"];
  return !pathsWithoutLayout.includes(location.pathname);
}

function App() {
  const shouldShowLayout = useShouldShowLayout();
  const loading = useLoader();

  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Header />,
  //     //loader: rootLoader,
  //     children: [
  //       {
  //         path: "team",
  //         element: <Footer />,
  //         // loader: teamLoader,
  //       },
  //     ],
  //   },
  // ]);


  return (
    <AuthProvider>
      {loading && <Loader />}
      {shouldShowLayout ? <Layout>{publicRoutes}</Layout> : publicRoutes}
    </AuthProvider>
  )
}

export default App
