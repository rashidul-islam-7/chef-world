"use client";
import { deleteRecipe } from "@/lib/action";
import { authClient } from "@/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DeleteRecipe = ({ recipeId }) => {
  const router = useRouter();

  const handleDelete = async (id) => {
    const response = await deleteRecipe(id);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response?.message || "Failed to delete!");
    }
    // Refresh page data
    router.refresh();
  };
  return (
    <>
      <AlertDialog>
        <Button
          className=" px-3 rounded cursor-pointer bg-red-50 
        text-red-600 text-sm font-semibold flex items-center gap-2 
        hover:bg-red-100 transition-all active:scale-95 "
        >
          <Trash2 size={12} />
          Delete
        </Button>

        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[400px]">
              <AlertDialog.CloseTrigger />

              <AlertDialog.Header>
                <AlertDialog.Icon status="danger" />

                <AlertDialog.Heading>Delete Your Recipe!</AlertDialog.Heading>
              </AlertDialog.Header>

              <AlertDialog.Body>
                <p>Are you sure you want to Delete this Recipe?</p>
              </AlertDialog.Body>

              <AlertDialog.Footer>
                <Button slot="close" variant="tertiary">
                  No
                </Button>

                <Button
                  onClick={() => handleDelete(recipeId)}
                  slot="close"
                  variant="danger"
                >
                  Yes Delete
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </>
  );
};

export default DeleteRecipe;
