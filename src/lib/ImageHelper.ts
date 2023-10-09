import type { SupabaseClient } from '@supabase/supabase-js';
import { createEventDispatcher } from 'svelte';

let imageUrl: string;
let url: string;

let supabase: SupabaseClient;
let dispatch: any;

export class ImageHelper {
	constructor(supabaseCLI: SupabaseClient) {
		dispatch = createEventDispatcher();
		supabase = supabaseCLI;
	}

	public async downloadImage(path: string, storage: string) {
		try {
			const { data, error } = await supabase.storage.from(storage).download(path);

			if (error) {
				throw error;
			}

			url = URL.createObjectURL(data);
			imageUrl = url;

			return imageUrl;
		} catch (error) {
			if (error instanceof Error) {
				console.log('Error downloading image: ', error.message);
				return error.message;
			}
		}
	}

	public async uploadImage(files: FileList, storage: string) {
		try {
			if (!files || files.length === 0) {
				throw new Error('You must select an image to upload.');
			}

			const file = files[0];
			const fileExt = file.name.split('.').pop();
			const filePath = `${Math.random()}.${fileExt}`;

			let { error } = await supabase.storage.from(storage).upload(filePath, file);

			if (error) {
				throw error;
			}

			return filePath;
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		}
	}
}
