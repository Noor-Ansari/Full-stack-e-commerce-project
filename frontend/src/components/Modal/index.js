import React from "react";
import "./Modal.css";
import { createPortal } from "react-dom";

const modalNode = document.getElementById("modal-root");

function Modal({ modalText, setModal }) {
	const handleClick = () => {
		setModal(false);
	};

	return createPortal(
		<div className='modal-wrapper'>
			<div className='modal'>
				<p className='modal-text'>{modalText}</p>
				<button className='modal-button' onClick={handleClick}>
					Ok
				</button>
			</div>
		</div>,
		modalNode
	);
}

export default Modal;
