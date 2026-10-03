import { loadPost, loadPosts } from "../Loaders/DevBlogLoader.ts";
import useAsync from "./useAsync.ts";

/* One thin hook per content type, all built on useAsync. */

export function usePosts(tag?: string, limit: number = 20) {
    return useAsync(() => loadPosts(tag, 0, limit), [tag, limit]);
}

export function usePost(slug: string) {
    return useAsync(() => loadPost(slug), [slug]);
}
