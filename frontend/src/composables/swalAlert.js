import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const showAlert = ({ 
  title = 'Alert', 
  text = '', 
  icon = 'info', 
  confirmButtonText = 'OK', 
  ...options 
}) => {
  return MySwal.fire({
    title,
    text,
    icon,
    confirmButtonText,
    ...options
  });
};

export default showAlert;
