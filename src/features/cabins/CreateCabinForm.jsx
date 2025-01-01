
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";



function CreateCabinForm({ cabinToEdit = {}}) {
  const { id:editId, ...editValues} = cabinToEdit;

  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState} = useForm({
    defaultValues: isEditSession ? editValues: {}
  });
  const { errors } = formState;

  const { isCreating, createCabin } = useCreateCabin();

  const { isEditing, editCabin} = useEditCabin();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {

    const image = typeof data.image === 'string' ? data.image : data.image[0];
    console.log(data)
    if(isEditSession) {
      editCabin({newCabinData: {...data,image}, id: editId},{
        onSuccess: () => reset()
      });
    }else{
      createCabin({...data, image: data.image[0]},{
        onSuccess: () => reset()
      });
    }
  }

  function onError(error) {
    console.log(error)
  }

  return (
    <Form  onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label='Cabin name'  error={errors?.name?.message}>
        <Input type="text" id="name" disabled={isWorking} {...register("name", {
          required: "This field is required",  
        })} />
      </FormRow>

      <FormRow label='Maximum Capacity' error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" disabled={isWorking} {...register("maxCapacity",{
          required: "This field is required",
          min: {
            value: 1,
            message: "Minimum of 1 person is required"
          }
        })} />
      </FormRow>

      <FormRow label='Regular Price' error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" disabled={isWorking} {...register("regularPrice", {
          required: "This field is required",
          min: {
            value: 1,
            message: "Minimum of 100 euros is required"
          }
        })} />
      </FormRow>

      <FormRow label='discount' error={errors?.discount?.message}>
        <Input type="number" id="discount" disabled={isWorking} defaultValue={0} {...register("discount",{
          required: "This field is required",
          validate: (value) => value <= getValues().regularPrice || 'discount should be less than the regular price'
        })}/>
      </FormRow>

      <FormRow label='description for website' error={errors?.description?.message}>
        <Textarea type="number" id="description" disabled={isWorking} defaultValue="" {...register("description",{
          required: "This field is required"
        })}/>
      </FormRow>

      <FormRow label='Cabin photo'>
        <FileInput id="image" accept="image/*" {...register("image",{
          required: isEditSession ?  false : "This field is required"
        })}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>{ isEditSession ? 'Edit Cabin' : 'Add new cabin'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
