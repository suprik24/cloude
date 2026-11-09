<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();

	let mode = $state<'signIn' | 'signUp'>('signIn');
	let pending = $state(false);

	$effect(() => {
		if (form?.mode) mode = form.mode as 'signIn' | 'signUp';
	});
</script>

<svelte:head>
	<title>{mode === 'signIn' ? 'Вход' : 'Регистрация'}</title>
</svelte:head>

<div class="card">
	<h1>{mode === 'signIn' ? 'Вход' : 'Регистрация'}</h1>
	<p class="muted">
		{mode === 'signIn' ? 'Войди по почте и паролю' : 'Создай аккаунт по почте и паролю'}
	</p>

	<form
		method="POST"
		action="?/{mode}"
		use:enhance={() => {
			pending = true;
			return async ({ update }) => {
				await update();
				pending = false;
			};
		}}
	>
		<label for="email">Почта</label>
		<input id="email" name="email" type="email" autocomplete="email" required value={form?.email ?? ''} />

		<label for="password">Пароль</label>
		<input
			id="password"
			name="password"
			type="password"
			minlength="8"
			autocomplete={mode === 'signIn' ? 'current-password' : 'new-password'}
			required
		/>

		{#if form?.message}
			<p class="error">{form.message}</p>
		{/if}

		<button type="submit" disabled={pending}>
			{mode === 'signIn' ? 'Войти' : 'Зарегистрироваться'}
		</button>
	</form>

	<p class="switch">
		{mode === 'signIn' ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
		<button type="button" class="link" onclick={() => (mode = mode === 'signIn' ? 'signUp' : 'signIn')}>
			{mode === 'signIn' ? 'Регистрация' : 'Войти'}
		</button>
	</p>
</div>

<style>
	.switch {
		margin: 20px 0 0;
		text-align: center;
		color: var(--muted);
		font-size: 13px;
	}

	.link {
		width: auto;
		padding: 0;
		border: 0;
		background: none;
		color: var(--text);
		font-size: 13px;
		text-decoration: underline;
		text-underline-offset: 3px;
	}
</style>
