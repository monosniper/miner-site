import { Button, Checkbox, FieldWrapper, TextField } from "@/components/ui";
import { usePutOptionsMutation } from "@/redux/api/optionsApi";
import { setUserData, user } from "@/redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormData = {
  network: string;
  mono_ip: boolean;
};

export const OptionsPage = () => {
  const [putOptions, { isSuccess, data, isError, isLoading }] =
    usePutOptionsMutation();
  const methods = useForm<FormData>();
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector(user);
  const [isMonoIp, setMonoIp] = useState<boolean>(
    userData?.options.mono_ip || false,
  );

  const formHandler = ({ network, mono_ip }: FormData) => {
    putOptions({ network, mono_ip });
  };

  useEffect(() => {
    if (!data) return;

    dispatch(setUserData(data));
  }, [data, dispatch]);

  useEffect(() => {
    if (!isError) return;

    toast.error("Mistake. Repeat again");
  }, [isError]);

  useEffect(() => {
    if (!userData) return;

    if (userData.options.network) {
      methods.setValue("network", userData.options.network);
    }

    if (userData.options.mono_ip !== undefined) {
      methods.setValue("mono_ip", userData.options.mono_ip);
    }
  }, [methods, userData]);

  useEffect(() => {
    if (!userData) return;

    setMonoIp(userData.options.mono_ip!);
  }, [userData]);

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
            {/* 
            <Checkbox
              label="Use mono IP"
              id="useMonoIP"
              isCheckedVal={isMonoIp}
              onChange={(value) => {
                setMonoIp(value);
              }}
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
