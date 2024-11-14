
import App from "./App";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
