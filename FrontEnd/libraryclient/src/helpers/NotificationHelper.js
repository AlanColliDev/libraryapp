import { toast } from 'react-toastify';
import { VerbNotification } from '../constants/VerbsNotification';

const { _SUCCESS, _ERROR } = VerbNotification;

export const NotificationHelper = ({

	typeNotification = _SUCCESS,
	message = '',
	interval = undefined,
	autoClose = 3000,
	position = 'top-right',

}) => {

	

	if(typeNotification === _ERROR)
		return {
			ErrorNotification: () => {
				toast.error(message, {
					autoClose,
					delay: interval,
					theme:'colored',
					position,
					hideProgressBar: true,
				});
			}
		}

	if(typeNotification === _SUCCESS)
		return  {
			SuccessNotification: () => {
				toast.success(message, {
					autoClose,
					delay: interval,
					theme:'colored',
					position,
				});
			}
		}
}