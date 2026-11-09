<script lang="ts">
	import { authClient } from '../lib/auth-client';

	let pending = $state(false);

	async function signOut() {
		pending = true;
		await authClient.signOut();
		window.location.href = '/login';
	}
</script>

<button type="button" class="ghost" disabled={pending} onclick={signOut}>Выйти</button>
