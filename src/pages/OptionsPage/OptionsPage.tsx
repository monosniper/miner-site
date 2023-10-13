import { Button, FieldWrapper, TextField } from "@/components/ui";
import { Radio } from "@/components/ui/Radio/Radio";
import { useState } from "react";

export const OptionsPage = () => {
  const [currentPage] = useState(0);

  return (
    <div className="flex flex-col flex-grow mt-4 sm:mt-5">
      <h3 className="text-2xl font-semibold sm:text-center sm:text-3xl">
        Options
      </h3>

      {currentPage === 0 && (
        <form className="flex flex-col mt-6 flex-grow">
          <div className="flex flex-col gap-6">
            <FieldWrapper title="Network">
              <TextField placeholder="Your network" />
            </FieldWrapper>

            <Radio
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
            />
          </div>

          <Button
            className="!w-max mx-auto mt-auto sm:mt-10 bg-white"
            title="Save"
          />
        </form>
      )}
    </div>
  );
};
