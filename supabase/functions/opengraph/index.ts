// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { DOMParser } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts';
import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
	// This is needed if you're planning to invoke your function from a browser.
	if (req.method === 'OPTIONS') {
		return new Response('ok', { headers: corsHeaders });
	}

	try {
		const { link } = await req.json();
		const textResponse = await fetch(link);
		const textData = await textResponse.text();

		const document = new DOMParser().parseFromString(textData, 'text/html');
		const ogImageElement = document.head.querySelector('[property$=image][content]');

		const ogImage = ogImageElement?.getAttribute('content') ?? '';

		const data = {
			ogImage
		};

		return new Response(JSON.stringify(data), {
			headers: { ...corsHeaders, 'Content-Type': 'application/json' }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			headers: { ...corsHeaders, 'Content-Type': 'application/json' },
			status: 400
		});
	}
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
