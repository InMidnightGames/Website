import { createBrowserRouter } from "react-router";
import Layout from "../Common/layout/index.tsx";
import Home from "../pages/Home";
import LegalPage from "../pages/Legal";
import UnsubscribePage from "../pages/Unsubscribe";
import UnsubscribeConfirmPage from "../pages/Unsubscribe/Confirm.tsx";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/legal",
                element: <LegalPage />,
            },
            {
                path: "/unsubscribe",
                element: <UnsubscribePage />,
            },
            {
                path: "/unsubscribe/confirm",
                element: <UnsubscribeConfirmPage />,
            },
            {
                path: "*",
                element: <Home />,
            },
        ],
    },
]);

export default router;
