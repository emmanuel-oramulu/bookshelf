import {
  createContext,
  useState,
  useContext
} from 'react';
import ToastBar from './components/ToastBar';

const ToastContext = createContext();

function ToastProvider ( {
  children
}) {
  const [toast,
    setToast] = useState( {
      show: false, msg: '', type: ''
    });

  function showToast (msg, type = 'info') {
    setToast({
      show: true, msg, type
    });

    setTimeout(() => {
      setToast({
        show: false, msg: '', type: ''
      });
    }, 10000)
  }

  return(
    <ToastContext.Provider value={ { showToast }}>
      {children}
      <ToastBar msg={toast.msg} show={toast.show} type={toast.type} />
    </ToastContext.Provider>
  );
}

function useToast () {
  return useContext(ToastContext);
}

export {
  ToastProvider,
  useToast
};