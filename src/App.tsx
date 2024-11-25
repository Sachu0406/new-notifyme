import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Components/Layout";
import { AuthProvider } from "./AuthContext";
import { useLocation } from "react-router-dom";
import Loader from "./Components/Shared/Loader";
import { useLoader } from "./Components/Shared/UseLoader";
import { ThemeProvider } from "./ThemeContext";

const ManageJobsGrid = lazy(() => import("./Components/Pages/ManageJobsGrid"));
// const ManageGovtSchemes = lazy(
//   () => import("./Components/Pages/ManageGovtSchemes")
// );
// const GovtSchemesGrid = lazy(
//   () => import("./Components/Pages/GovtSchemesGrid")
// );
// const ManageAdmissions = lazy(
//   () => import("./Components/Pages/ManageAdmissions")
// );
const ManageAdmissionGrid = lazy(
  () => import("./Components/Pages/ManageAdmissionGrid")
);
// const ManageJobs = lazy(() => import("./Components/Pages/ManageJobs"));
const HomePage = lazy(() => import("./Components/Pages/Home"));
// const Login = lazy(() => import("./Components/Auth/SignIn"));
// const Register = lazy(() => import("./Components/Auth/SignUp"));
const NotificationList = lazy(
  () => import("./Components/Pages/NotificationList")
);
const ErrorPage = lazy(() => import("./Components/Shared/Error404"));
const NotificationDetailsPage = lazy(
  () => import("./Components/Pages/NotificationDetailsPage")
);

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
        {/* <Route path="/Login" Component={Login} />
        <Route path="/Register" Component={Register} /> */}
        <Route path="/Home" Component={HomePage} />
        <Route path="/jobs" Component={NotificationList} />
        <Route path="/admissions" Component={NotificationList} />
        <Route path="/others" Component={NotificationList} />
        <Route path="/jobDetails" Component={NotificationDetailsPage} />
        <Route path="/AdmissionDetails" Component={NotificationDetailsPage} />
        <Route path="/otherDetails" Component={NotificationDetailsPage} />
        {/* <Route path="/manageJobs" Component={ManageJobs} />
        <Route path="/manageJobs/:jobId" Component={ManageJobs} /> */}
        <Route path="/manageJobsGrid" Component={ManageJobsGrid} />
        {/* <Route path="/manageAdmissions" Component={ManageAdmissions} />
        <Route path="/manageAdmissions/:admId" Component={ManageAdmissions} /> */}
        <Route path="/manageAdmissionsGrid" Component={ManageAdmissionGrid} />
        {/* <Route path="/manageGovtSchemes" Component={ManageGovtSchemes} />
        <Route
          path="/manageGovtSchemes/:schemeId"
          Component={ManageGovtSchemes}
        />
        <Route path="/manageGovtSchemesGrid" Component={GovtSchemesGrid} /> */}
        <Route path="/" element={<Navigate to="/Home" replace />} />
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
