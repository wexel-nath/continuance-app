import { useSnackbar } from "notistack";

const useMessage = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showMessage = (message, variant) => {
    const options = {
      variant,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right"
      }
    };
    enqueueSnackbar(message, options);
  };

  const showDefault = message => showMessage(message, "default");
  const showSuccess = message => showMessage(message, "success");
  const showError = message => showMessage(message, "error");
  const showWarning = message => showMessage(message, "warning");
  const showInfo = message => showMessage(message, "info");

  return { showDefault, showSuccess, showError, showWarning, showInfo };
};

export default useMessage;
