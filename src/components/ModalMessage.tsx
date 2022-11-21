import { Modal, Button } from "react-bootstrap";
import { useAppDispatch } from "../app/hooks";
import { clearMessage } from "../features/message/messageSlice";

const ModalMessage = ({ title, bodyText, show }: {
  show: boolean;
  title: string;
  bodyText: string;
}) => {
  const dispatch = useAppDispatch();

  return (
    <Modal
      show={show}
      onHide={() => dispatch(clearMessage())}
      backdrop="static"
      keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {bodyText}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => dispatch(clearMessage())}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
};

export default ModalMessage;