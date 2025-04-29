"use client"
import { ReloadIcon } from "@radix-ui/react-icons";
import { useFormStatus } from "react-dom";
import { LuPenSquare, LuTrash2 } from "react-icons/lu";
import { Button } from "../ui/button";

type actionType = "edit" | "delete" | "pending";
export const IconButton = ({ actionType }: { actionType: actionType }) => {
  const { pending } = useFormStatus();

  const renderIcon = () => {
    switch (actionType) {
      case 'edit':
        return <LuPenSquare />;
      case 'delete':
        return <LuTrash2 />;
      case 'pending':
        return <ReloadIcon className='animate-spin' />;
    }
  };

  return (
    <Button
      type='submit'
      size='icon'
      variant='link'
      className='p-2 cursor-pointer'
    >
      {pending ? <ReloadIcon className=' animate-spin' /> : renderIcon()}
    </Button>
  );
};