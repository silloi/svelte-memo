export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type MemoResponse = {
	id: number;
	user_id: string;
	text: string | null;
	is_pinned: boolean | null;
	inserted_at: string;
};

export type MemoRequest = {
	id?: number;
	user_id: string;
	text?: string | null;
	is_pinned?: boolean | null;
	inserted_at?: string;
};

export interface Database {
	public: {
		Tables: {
			memos: {
				Row: MemoResponse;
				Insert: MemoRequest;
				Update: MemoRequest;
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
	};
}
