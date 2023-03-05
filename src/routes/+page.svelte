<script lang="ts">
	import type { ActionData, PageServerData } from './$types'
	import { enhance } from '$app/forms'
	import { fly, slide } from 'svelte/transition'

	export let data: PageServerData
	export let form: ActionData

	let creating = false
	let deleting: string[] = []
</script>

<h1 class="text-2xl font-bold mb-4">Todos</h1>

<!-- {#if form?.message}
	<p class="text-emerald-400">{form.message}</p>
{/if} -->

<form
	method="POST"
	action="?/create"
	use:enhance={() => {
		creating = true
		return async ({ update }) => {
			await update()
			creating = false
		}
	}}
>
	<label class="flex flex-col items-start" class:text-emerald-400={creating}>
		{creating ? 'Saving...' : 'Add todo'}
		<input type="text" name="description" value={form?.description ?? ''} />
		{#if form?.error}
			<p class="text-red-400">{form.error}</p>
		{/if}
	</label>
</form>

<h3 class="text-lg font-medium mb-2 mt-6 underline text-zinc-400">Previous tasks</h3>
<ul class="list-none">
	{#each data.todos.filter((todo) => !deleting.includes(todo.id)) as todo (todo.id)}
		<li in:fly={{ y: 20 }} out:slide>
			<form
				class="flex gap-4"
				method="POST"
				action="?/delete"
				use:enhance={() => {
					deleting = [...deleting, todo.id]
					return async ({ update }) => {
						await update()
						deleting = deleting.filter((id) => id !== todo.id)
					}
				}}
			>
				<input type="hidden" name="id" value={todo.id} />
				<span>{todo.description}</span>
				<button>🆇</button>
			</form>
		</li>
	{/each}
</ul>
