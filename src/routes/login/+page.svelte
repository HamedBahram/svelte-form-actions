<script lang="ts">
	import type { PageData, ActionData } from './$types'

	export let data: PageData
	export let form: ActionData
</script>

<section class="section">
	<div class="container">
		<form method="POST" action="?/login">
			<label class="flex flex-col">
				Email
				<input type="text" name="email" />
			</label>
			<label class="flex flex-col">
				Password
				<input type="password" name="password" />
			</label>
			<div class="mt-3">
				<button class="border rounded-md px-4 py-2 hover:bg-gray-200">Login</button>
				<button class="border rounded-md px-4 py-2 hover:bg-gray-200" formaction="?/register"
					>Register</button
				>
			</div>
		</form>

		{#if form}
			<div class="mt-6">
				<pre>{JSON.stringify(form, null, 2)}</pre>
			</div>
		{/if}
	</div>
</section>
