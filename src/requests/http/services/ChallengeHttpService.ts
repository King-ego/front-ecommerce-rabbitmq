import ApiRequest from "@/requests/api";

export class ChallengeHttpService {
	public static async getChallenges(): Promise<any[]> {
		return ApiRequest<any[]>('/challenges', {
			cache: 'force-cache',
			next: {revalidate: 600},
			headers: {
				'Content-Type': 'application/json'
			},
		})
	}
}
