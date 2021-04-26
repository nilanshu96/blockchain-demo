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
      <p>Failed to reconcile the blocks as the blockchain was illegal</p>
      <button onClick={closeModal}>Close PopUp</button>
    </Modal>
  );
};

export default PopUp;
