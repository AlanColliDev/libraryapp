import { useState } from 'react';



export const useForm = ( initialForm = {} ) => {

	const [formState, setFormState] = useState(initialForm);
	const [ errors, setErrors ] = useState({});
	
	const HandleInputChange = ({target}) => {
		const { name, value } = target;

		if(value.length === 0 || parseFloat(value) === 0)
		{
			setErrors((errors) => {
				return {
					...errors,
					[name] : `El campo ${name} es requerido`
				}
			})
		}
		else
		{
			setErrors((errors) => {
				const {[name]:data, ...restData} = errors;
				return {
					...restData,
				}
			})
		}

		setFormState({
			...formState,
			[name] : value 
		});
	};

	const HandleSetDropdownForm = (name, value, selectedValue) => {
		HandleInputChange({
		  target: {
			name,
			value: selectedValue === value ? 0: selectedValue
		  }
		})
	  }

	const HandleGenrateUUID = () => {
		return String(Date.now().toString(32) + Math.random().toString(16)).replace(/\./g, '');
	};

	const HandleResetForm = (e) => {
		if(e)
			e.prevendDefault();
		setFormState(initialForm);

	};

	const HandleBlurForm = (e) => {
		HandleInputChange(e);
		setErrors((state) => {
			return {
				...state,
				...validateForm(e)
				// ...error
			}
		});
	}

	const HandleResetEror = (e) => {
		const {name, value} = e.target;
		setErrors(error => {
			const { [name]:value, ...rest } = error;
			return  {
				...rest
			}
		})
	};

	const ValidateForm = (formstate) => {
		Object.keys(formstate).map((key) =>  {
		  const value = formstate[key]
		  if(value === '' || parseFloat(value) === 0)
		  {
			setErrors((errors) => {
				return {
					...errors,
					[key] : `El campo ${key} es requerido`
				}
			})
		  }
		})
	}

	return {
		
		...formState,
		errors,
		formState,
		HandleInputChange,
		HandleResetForm,
		HandleBlurForm,
		HandleResetEror,
		HandleSetDropdownForm,
		setErrors,
		ValidateForm
	};
}