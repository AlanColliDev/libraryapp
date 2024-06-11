import { useContext, useState } from 'react'
import { CombustibleContext } from '../context/Logistica';

export const useProveedor = () => {
	
	const { proveedor, setProveedor } = useContext(CombustibleContext);

	const proveedores = [
		{
			id: 1,
			nombre: 'GASOMATIC'
		},
		{
			id: 2,
			nombre: 'ACORD'
		},
		{
			id: 3,
			nombre: 'ULTRAGAS'
		},
		{
			id: 4,
			nombre: 'PETROMAYAB'
		},
		{
			id: 5,
			nombre: 'SERVIFACIL'
		},
		{
			id: 6,
			nombre: 'OTRO'
		},
	];
	
	const [search, setSearch] = useState('')
	const [openDrop, setOpenDrop] = useState(false);

	const HandleSearch = (evt) => {
		setSearch(evt.target.value);
	};

	const HandleSelectedDrop = (option) => {
		if (option !== proveedor) {
			setProveedor(option);
		}
		else
			setProveedor(null);

		HandleSetOpenDrop();
		setSearch('');
	};

	const HandleSetOpenDrop = () => {
		setOpenDrop(!openDrop);
	};


	return {
		proveedores,
		search,
		proveedor,
		openDrop,
		HandleSearch,
		HandleSelectedDrop, 
		HandleSetOpenDrop
	};

}