export const fetchOgImage = async (linkUrl: string) => {
	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
	};

	const postData = JSON.stringify({ link: linkUrl });

	try {
		const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/opengraph`, {
			method: 'POST',
			headers,
			body: postData,
			redirect: 'follow'
		});
		const { ogImage } = await res.json();
		return ogImage;
	} catch (error) {
		console.error(error);
	}
};
