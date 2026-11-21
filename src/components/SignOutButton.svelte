<script lang="ts">
	import { authClient } from '../lib/auth-client';
	import { m } from '../paraglide/messages.js';
	import { localizeHref } from '../paraglide/runtime.js';

	let pending = $state(false);

	async function signOut() {
		pending = true;
		await authClient.signOut();
		window.location.href = localizeHref('/login');
	}
</script>

<button type="button" class="ghost" disabled={pending} onclick={signOut}>{m.sign_out_button()}</button>
