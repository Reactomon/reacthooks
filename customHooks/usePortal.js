import React from 'react';
import createPortal from 'react-dom';

const Portal = ({ children }) => {
    const [modalContainer] = useState(document.createElement('div'));

    useEffect(() => {
      let modalRoot = document.getElementById('modal-root');
      if (!modalRoot) {
        const tempEl = document.createElement('div');
        tempEl.id = 'modal-root';
        document.body.append(tempEl);
        modalRoot = tempEl;
      }

      modalRoot.appendChild(modalContainer);
      return function cleanup() {
        modalRoot.removeChild(modalContainer);
      };

    }, []);
  
    return createPortal(children, modalContainer);
};

const usePortal = (WrappedComponent, ) => {

}
  
const ModalComponent = () => (
    <CustomModal />
)

export default usePortal(ModalComponent);