import { toast } from "react-toastify";

/**
 * Displays a notification using the toast library.
 *
 * @param {string} type - The type of the notification (e.g., 'success', 'error', 'warning').
 * @param {string} message - The message to be displayed in the notification.
 * @param {object} config - Additional configuration options for the toast.
 */
export const notify = (type, message, config) => {
  toast(message, {
    type,
    ...config,
  });
};
