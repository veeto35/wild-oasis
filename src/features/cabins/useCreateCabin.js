import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useCreateCabin(){ 

    const queryClient = useQueryClient();
    
    const {mutate: createCabin,isLoading: isCreating} = useMutation({
        mutationFn: createEditCabin,
        onSuccess: () => { toast.success("New Cabin has been created"); queryClient.invalidateQueries('cabin');},
        onError: (error) => toast.error("Failed to create cabin", error),
    })

    return { isCreating, createCabin };
}