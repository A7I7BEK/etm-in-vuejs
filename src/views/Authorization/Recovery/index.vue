<template>
	<div>
		<keep-alive include="ContactEntry">
			<contact-entry
					v-if="step === 'contact'"
					@emit:data="ListenEmitContact"
			></contact-entry>


			<otp-confirm
					v-else-if="step === 'confirm'"
					:resource="contactData"
					@emit:data="ListenEmitConfirm"
					@emit:back="step = 'contact'"
			></otp-confirm>


			<password-entry
					v-else-if="step === 'password'"
					:resource="confirmData"
					@emit:back="step = 'contact'"
			></password-entry>
		</keep-alive>
	</div>
</template>

<script>
	import ContactEntry from './parts/ContactEntry';
	import OtpConfirm from './parts/OtpConfirm';
	import PasswordEntry from './parts/PasswordEntry';


	export default {
		name: 'Recovery',
		components: {
			ContactEntry,
			OtpConfirm,
			PasswordEntry,
		},
		data()
		{
			return {
				step: 'contact',
				contactData: {},
				confirmData: {},
			};
		},
		methods: {
			ListenEmitContact(val)
			{
				this.contactData = val;
				this.step = 'confirm';
			},
			ListenEmitConfirm(val)
			{
				this.confirmData = val;
				this.step = 'password';
			},
		}
	};
</script>