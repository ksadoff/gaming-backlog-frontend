import { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 10,
    },
  };

interface CreateLibraryModalProps {
    isOpen: boolean;
    onClose: any;
    onSubmit: any;
}

export default function CreateLibraryModal({ isOpen, onClose, onSubmit }: CreateLibraryModalProps) {
    const [libraryName, setLibraryName] = useState('');

    const onSubmitLibrary = async () => {
        await onSubmit(libraryName);
        onClose();
    }

    return (
        <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="CreateLibraryModal"
        style={customStyles}
        ariaHideApp={false}
        >
            <h2>Create New Library</h2>
            <div>Enter your library name here</div>
            <form>
                <input data-testid="libraryName" type="text" onChange={(e) => setLibraryName(e.target.value)}/>
            </form>
            <button onClick={onClose}>close</button>
            <button onClick={onSubmitLibrary}>submit</button>
        </Modal>
    )
}