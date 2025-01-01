import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinAPI } from "../../services/apiCabins";
import toast from "react-hot-toast";


export function useDeleteCabin() {
    const queryClient = useQueryClient();

    const {isLoading: isDeleting, mutate: deleteCabin } = useMutation({
        mutationFn: deleteCabinAPI,
        onSuccess: () => {
        toast.success("Cabin deleted successfully!");
        queryClient.invalidateQueries({
            queryKey: ['cabin']
        })
        },
        onError: (error) => toast.error(error.message)

    });

    return { isDeleting, deleteCabin };
}