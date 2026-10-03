import { createBrowserRouter, type RouteObject } from "react-router";
import ErrorPage from "../common/components/ErrorPage.tsx";
import Layout from "../common/layouts/Layout.tsx";
import { features } from "../constants/config.tsx";
import CareersPage from "../pages/Careers";
import DevBlogPage from "../pages/DevBlog";
import PostDetailPage from "../pages/DevBlog/PostDetail.tsx";
import HomePage from "../pages/Home";
import LegalPage from "../pages/Legal";
import UnsubscribePage from "../pages/Unsubscribe";
import UnsubscribeConfirmPage from "../pages/Unsubscribe/Confirm.tsx";

const { pages } = features;

/** Routes for pages switched off in features.pages are left out, so they 404. */
const pageRoutes: [RouteObject, boolean][] = [
    [{ path: "/careers", element: <CareersPage /> }, pages.careers],
    [{ path: "/devblog", element: <DevBlogPage /> }, pages.devblog],
    [{ path: "/devblog/:slug", element: <PostDetailPage /> }, pages.devblog],
    [{ path: "/legal", element: <LegalPage /> }, pages.legal],
    [{ path: "/unsubscribe", element: <UnsubscribePage /> }, pages.unsubscribe],
    [{ path: "/unsubscribe/confirm", element: <UnsubscribeConfirmPage /> }, pages.unsubscribe],
];

const router = createBrowserRouter([
    {
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            ...pageRoutes.filter(([, enabled]) => enabled).map(([route]) => route),
            { path: "*", element: <ErrorPage notFound /> },
        ],
    },
]);

export default router;
