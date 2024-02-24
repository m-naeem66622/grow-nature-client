import PropTypes from "prop-types";

const ConfirmationModal = ({ modalRef, onConfirm, children, variant = "" }) => {
  const confirmHandle = (_id) => {
    onConfirm(_id).then(() => {
      modalRef.current.close();
    });
  };

  return (
    <dialog ref={modalRef} className="modal backdrop-blur-sm bg-white/30">
      <div className="modal-box">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => modalRef.current.close()}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        {children}
        <div className="modal-action">
          <button
            className="btn btn-bordered"
            onClick={() => modalRef.current.close()}
          >
            Cancel
          </button>
          {variant === "delete" ? (
            <button
              className="btn btn-error text-white"
              onClick={confirmHandle}
            >
              Delete
            </button>
          ) : (
            <button className="btn btn-primary" onClick={confirmHandle}>
              Confirm
            </button>
          )}
        </div>
      </div>
    </dialog>
  );
};

ConfirmationModal.propTypes = {
  modalRef: PropTypes.object.isRequired,
  onConfirm: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
};

export default ConfirmationModal;
