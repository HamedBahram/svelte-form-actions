import type { Actions } from './$types'

export const actions: Actions = {
	login: async ({ cookies, params, request, url }) => {
		// TODO: Log the user in
		const formData = await request.formData()
		const email = formData.get('email')
		const password = formData.get('password')
		return { email, password }
	},
	register: async ({ cookies, params, request, url }) => {
		// TODO: Register the user
	}
}
