import * as db from '$lib/server/db'
import type { ServerLoad } from '@sveltejs/kit'
import type { Actions } from './$types'
import { fail } from '@sveltejs/kit'
import { delay } from '$lib/utils'

export const load: ServerLoad = ({ cookies }) => {
	const userId = cookies.get('userId')

	if (!userId) {
		cookies.set('userId', crypto.randomUUID(), { path: '/' })
	}

	return {
		todos: db.getTodos(userId) ?? []
	}
}

export const actions: Actions = {
	create: async ({ cookies, request }) => {
		await delay(2000)
		const userId = cookies.get('userId')
		const data = await request.formData()
		const description = data.get('description')
		try {
			db.createTodo(userId, description)
			return { message: 'success' }
		} catch (error: any) {
			return fail(422, {
				description,
				error: error.message
			})
		}
	},

	delete: async ({ cookies, request }) => {
		await delay(2000)
		const userId = cookies.get('userId')
		const formData = await request.formData()
		const todoId = formData.get('id')
		db.deleteTodo(userId, todoId)
	}
}
