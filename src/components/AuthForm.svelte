<script lang="ts">
	import { authClient, errorMessage } from '../lib/auth-client';

	let mode = $state<'signIn' | 'signUp'>('signIn');
	let email = $state('');
	let password = $state('');
	let pending = $state(false);
	let message = $state('');

	async function submit(event: SubmitEvent) {
		event.preventDefault();
		pending = true;
		message = '';

		const { error } =
			mode === 'signIn'
				? await authClient.signIn.email({ email, password })
				: await authClient.signUp.email({ email, password, name: email.split('@')[0] });

		pending = false;
		if (error) {
			message = errorMessage(error);
			return;
		}
		window.location.href = '/';
	}

	function toggleMode() {
		mode = mode === 'signIn' ? 'signUp' : 'signIn';
		message = '';
	}
</script>

<div class="card">
	<h1>{mode === 'signIn' ? 'Вход' : 'Регистрация'}</h1>
	<p class="muted">
		{mode === 'signIn' ? 'Войди по почте и паролю' : 'Создай аккаунт по почте и паролю'}
	</p>

	<form onsubmit={submit}>
		<label for="email">Почта</label>
		<input id="email" type="email" autocomplete="email" required bind:value={email} />

		<label for="password">Пароль</label>
		<input
			id="password"
			type="password"
			minlength="8"
			autocomplete={mode === 'signIn' ? 'current-password' : 'new-password'}
			required
			bind:value={password}
		/>

		{#if message}
			<p class="error">{message}</p>
		{/if}

		<button type="submit" disabled={pending}>
			{mode === 'signIn' ? 'Войти' : 'Зарегистрироваться'}
		</button>
	</form>

	<p class="switch">
		{mode === 'signIn' ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
		<button type="button" class="link" onclick={toggleMode}>
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
