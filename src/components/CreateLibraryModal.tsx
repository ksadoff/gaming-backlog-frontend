import { useState } from 'react';
import Modal from 'react-modal';
import LibraryRequest from '../interfaces/LibraryRequest';
import * as libraryApi from "../api/libraryApi";

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
}

export default function CreateLibraryModal({ isOpen, onClose,  }: CreateLibraryModalProps) {
    const [libraryName, setLibraryName] = useState('');

    const onSubmit = async () => {
        const newLibrary: LibraryRequest = {
            name: libraryName,
            games: [], // for now we only support creating empty library
        };

        await libraryApi.createLibrary(newLibrary);
        onClose();
    }

    return (
        <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="CreateLibraryModal"
        style={customStyles}
        >
            <h2>Create New Library</h2>
        <div>Enter your library name here</div>
        <form>
          <input type="text" onChange={(e) => setLibraryName(e.target.value)}/>
        </form>
        <button onClick={onClose}>close</button>
        <button onClick={onSubmit}>submit</button>
        </Modal>
    )
}