<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Главная</title>
</svelte:head>

<div class="card">
	<h1>Ты вошёл</h1>
	<p class="muted">{data.email}</p>

	<form method="POST" action="?/signOut">
		<button type="submit" class="ghost">Выйти</button>
	</form>
</div>
