"use client";
import { useRouter } from "next/navigation";
import { AlertDialog, Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { deleteRecipe } from "@/lib/action";

const DeleteRecipeButton = ({ recipeId }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const res = await deleteRecipe(recipeId);

    if (res.success) {
      toast.success(res.message);
      router.refresh();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <>
      <AlertDialog>
        <button
          className=" px-2 py-1 rounded cursor-pointer bg-red-50 
            text-red-600 text-sm font-semibold flex items-center  
            hover:bg-red-100 transition-all active:scale-95 "
        >
          <Trash2 size={12} />
          Delete
        </button>

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

                <Button onClick={handleDelete} slot="close" variant="danger">
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

export default DeleteRecipeButton;
