import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";


export function useEditSettings() {
    const queryClient = useQueryClient();

    const {mutate: editSettings,isLoading: isEditing} = useMutation({
      mutationFn: updateSetting,
      onSuccess: () => { toast.success("Setting has been edited sucessfully"); queryClient.invalidateQueries('settings');},
      onError: (error) => toast.error("Failed to edit setting", error),
    });


    return { isEditing, editSettings};
}