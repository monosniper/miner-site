import { Button, FieldWrapper, TextField } from "@/components/ui";
import { usePutOptionsMutation } from "@/redux/api/optionsApi";
import { setUserData } from "@/redux/slices/userSlice";
import { useAppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  network: string;
};

export const OptionsPage = () => {
  const [putOptions, { isSuccess, data, isError, isLoading }] =
    usePutOptionsMutation();
  const methods = useForm<FormData>();
  const dispatch = useAppDispatch();

  const formHandler = ({ network }: FormData) => {
    putOptions({ network });
  };

  useEffect(() => {
    if (!data) return;

    dispatch(setUserData(data));
  }, [data, dispatch]);

  useEffect(() => {
    if (!isError) return;

    alert("Mistake. Repeat again");
  }, [isError]);

  return (
    <div className="flex flex-col flex-grow mt-8 mb-[110px]">
      <div className="container flex flex-col flex-grow">
        <div className="hidden sm:flex flex-col">
          <h3 className="text-2xl font-semibold sm:text-center sm:text-3xl">
            Options
          </h3>
        </div>

        <form
          className="flex flex-col flex-grow sm:mt-6"
          onSubmit={methods.handleSubmit(formHandler)}
        >
          <div className="flex flex-col gap-6">
            <FieldWrapper
              title="Network"
              error={methods.formState.errors.network?.message}
            >
              <TextField
                placeholder="Your network"
                methods={methods}
                registerName="network"
                options={{
                  required: {
                    value: true,
                    message: "Поле обязательно для заполнения",
                  },
                }}
              />
            </FieldWrapper>

            {/* <Radio
                list={[
                  {
                    id: "network",
                    name: "network",
                    value: "mono",
                    label: "Use mono IP",
                  },
                  {
                    id: "mac",
                    name: "network",
                    value: "mac",
                    label: "Start with MacOS",
                  },
                ]}
              /> */}
          </div>

          <div className="mx-auto mt-auto sm:mt-10 pt-5 sm:pt-0">
            <Button
              className="!w-max bg-white"
              title={isSuccess ? "Success!" : "Save"}
              type="submit"
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
