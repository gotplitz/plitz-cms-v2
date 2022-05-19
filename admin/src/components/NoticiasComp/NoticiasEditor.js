import React from 'react';
import { Modal } from 'reactstrap';

// Parts
import AddNoticia from '../../pages/Noticias/AddNoticia';

const NoticiasEditor = ({ isOpen, toggle, fmlink }) => {
	return (
		<Modal
			className='modal-lg'
			style={{ minWidth: '90%' }}
			isOpen={isOpen}
			toggle={toggle}
		>
			<div className='modal-header'>
				<h5 className='modal-title mt-0' id='myModalLabel'>
					Ferocious Media CMS Editor
				</h5>
				<button
					type='button'
					onClick={toggle}
					className='close'
					data-dismiss='modal'
					aria-label='Close'
				>
					<span aria-hidden='true'>&times;</span>
				</button>
			</div>
			<div className='modal-body'>
				<AddNoticia fmlink={fmlink} toggle={toggle} />
			</div>
		</Modal>
	);
};

export default NoticiasEditor;
