import { ValidationObserver, ValidationProvider } from 'vee-validate';
import AlertInline from '@components/AlertInline';

export default {
	components: {
		AlertInline,
		ValidationObserver,
		ValidationProvider,
	},
	data() {
		return {
			errorMessage: null,
		};
	},
};
