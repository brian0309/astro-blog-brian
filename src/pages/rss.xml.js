import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
	const posts = await getCollection('blog');
	const visiblePosts = posts.filter((p) => !(p.data.tags?.includes('hidden-post')));
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: visiblePosts.map((post) => ({
			...post.data,
			link: `/blog/${post.slug}/`,
		})),
	});
}
