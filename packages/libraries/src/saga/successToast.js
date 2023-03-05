import { toast } from 'react-toastify';

const successToast = message => () => {
  toast.success(message);
};

export default successToast;
