import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useEditCabin() {
    const queryClient = useQueryClient();

    const {mutate: editCabin,isLoading: isEditing} = useMutation({
      mutationFn: ({newCabinData, id}) => createEditCabin(newCabinData,id),
      onSuccess: () => { toast.success("Cabin has been edited sucessfully"); queryClient.invalidateQueries('cabin');},
      onError: (error) => toast.error("Failed to create cabin", error),
    });


    return { isEditing, editCabin};
}