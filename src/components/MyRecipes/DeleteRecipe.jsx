"use client";

import { useState } from "react";
import { deleteRecipe } from "@/lib/action";
import { AlertDialog, Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DeleteRecipe = ({ recipeId }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id) => {
    try {
      setIsDeleting(true);
      const response = await deleteRecipe(id);

      if (response?.success) {
        toast.success(response.message || "Recipe deleted successfully!");
        setIsOpen(false); 
        router.refresh(); 
      } else {
        toast.error(response?.message || "Failed to delete!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog isOpen={isOpen} onOpenChange={setIsOpen}>
      <AlertDialog.Trigger>
        <button
          onClick={() => setIsOpen(true)}
          className="px-2 rounded cursor-pointer bg-red-100 py-1
            text-red-600 text-sm font-semibold flex items-center gap-1 
            hover:bg-red-200 transition-all active:scale-95"
        >
          <Trash2 size={12} />
          Delete
        </button>
      </AlertDialog.Trigger>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete a Recipe!</AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <p>Are you sure you want to Delete this Recipe?</p>
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button
                variant="tertiary"
                disabled={isDeleting}
                onClick={() => setIsOpen(false)}
              >
                No
              </Button>

              <Button
                onClick={() => handleDelete(recipeId)}
                variant="danger"
                isLoading={isDeleting}
              >
                Yes Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default DeleteRecipe;
