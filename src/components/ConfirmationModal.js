const ConfirmationModal = ({ isOpen, onClose, onConfirm, title }) => {
	if (!isOpen) return null;

	return (
		<div className={`modal ${isOpen ? 'modal--is-open' : ''}`}>
			<div className="modal__overlay" onClick={onClose} />

			<div className="modal__content">
				<h3 className="modal__title">{title}</h3>

				<p className="modal__description">
					Czy na pewno chcesz usunąć ten element? Tej operacji nie da się
					cofnąć.
				</p>

				<div className="modal__actions">
					<button
						className="modal__button modal__button--cancel"
						onClick={onClose}
					>
						Anuluj
					</button>
					<button
						className="modal__button modal__button--confirm"
						onClick={onConfirm}
					>
						Usuń
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmationModal;
