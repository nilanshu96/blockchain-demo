import Modal from "react-modal";

const PopUp = ({ modalIsOpen, setModalIsOpen }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      display: "flex",
      flexDirection: "column",
    },
  };

  Modal.setAppElement("#root");

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel={"failure popUp"}
    >
      <p className="f-l fc-r ta-center">
        Failed to reconcile the blocks as the blockchain was illegal
      </p>
      <button className="center btn btn-bg-red padding-4" onClick={closeModal}>
        Close
      </button>
    </Modal>
  );
};

export default PopUp;
