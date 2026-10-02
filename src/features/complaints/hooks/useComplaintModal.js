import { useState } from "react";

export default function useComplaintModal() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);

  const show = (complaint) => {
    setData(complaint);
    setOpen(true);
  };

  const hide = () => {
    setOpen(false);
    setData(null);
  };

  return { open, data, show, hide };
}
