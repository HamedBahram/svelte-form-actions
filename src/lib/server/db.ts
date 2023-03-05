const db = new Map()

type TODO = {
	id: string
	description: string
	done: boolean
}

export function getTodos(userId: string | undefined): TODO[] | [] {
	return db.get(userId)
}

export function createTodo(userId: string | undefined, description: FormDataEntryValue | null) {
	if (!description) {
		throw new Error('todo must have a description')
	}

	if (!db.has(userId)) {
		db.set(userId, [])
	}

	const todos = db.get(userId)

	if (todos.find((todo: { description: FormDataEntryValue }) => todo.description === description)) {
		throw new Error('todo must be unique')
	}

	todos.push({
		id: crypto.randomUUID(),
		description,
		done: false
	})
}

export function deleteTodo(userId: string | undefined, todoId: FormDataEntryValue | null) {
	const todos: TODO[] = db.get(userId) ?? []
	const filtered = todos.filter((todo) => todo.id !== todoId)
	db.set(userId, filtered)
}
