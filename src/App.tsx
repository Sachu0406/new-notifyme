import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import { AuthProvider } from "./AuthContext";
import { useLocation } from "react-router-dom";
import Loader from "./Components/Shared/Loader";
import { useLoader } from "./Components/Shared/UseLoader";
import { ThemeProvider } from "./ThemeContext";

const NotificationForm = lazy(() => import("./Components/Pages/NotificationForm"));
const ErrorPage = lazy(() => import("./Components/Shared/Error404"));
const HomePage = lazy(() => import("./Components/Pages/Home"));
const ManageNotificationsGrid = lazy(() => import("./Components/Pages/ManageNotificationsGrid"));

function useShouldShowLayout() {
  const location = useLocation();
  const pathsWithoutLayout = ["/Login", "/Register"];
  return !pathsWithoutLayout.includes(location.pathname);
}

function App() {
  const shouldShowLayout = useShouldShowLayout();
  const loading = useLoader();

  const publicRoutes = (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="*" Component={ErrorPage} />
        <Route path="/" Component={HomePage} />
        <Route path="/addNewNotification" Component={NotificationForm} />
        <Route path="/editNotification/:notificationId" Component={NotificationForm} />
        <Route path="/manageNotificationsData" Component={ManageNotificationsGrid} />
      </Routes>
    </Suspense>
  );
  return (
    <AuthProvider>
      <ThemeProvider>
        {loading && <Loader />}
        {shouldShowLayout ? <Layout>
          <div className="container">
            {publicRoutes}
          </div>
        </Layout> : publicRoutes}
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
