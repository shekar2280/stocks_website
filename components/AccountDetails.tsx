"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import InputField from "./forms/InputField";
import { CountrySelectField } from "./forms/CountrySelectField";
import SelectField from "./forms/SelectField";
import {
  INVESTMENT_GOALS,
  RISK_TOLERANCE_OPTIONS,
  PREFERRED_INDUSTRIES,
} from "@/lib/constants";
import { Button } from "./ui/button";
import { updateUserProfile } from "@/lib/actions/auth.actions";

interface AccountDetailsProps {
  user: {
    id: string;
    name: string;
    email: string;
    country: string;
    investmentGoals: string;
    riskTolerance: string;
    preferredIndustry: string;
  };
}

const AccountDetails = ({ user }: AccountDetailsProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: user.name,
      email: user.email,
      currentPassword: "",
      newPassword: "",
      country: user.country,
      investmentGoals: user.investmentGoals,
      riskTolerance: user.riskTolerance,
      preferredIndustry: user.preferredIndustry,
    },
  });

  const onSubmit = async (values: any) => {
    await updateUserProfile(user.id, {
      fullName: values.fullName,
      country: values.country,
      investmentGoals: values.investmentGoals,
      riskTolerance: values.riskTolerance,
      preferredIndustry: values.preferredIndustry,
    });

    // if (values.currentPassword && values.newPassword) {
    //   await authClient.changePassword({
    //     currentPassword: values.currentPassword,
    //     newPassword: values.newPassword,
    //   });
    // }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-3xl font-semibold tracking-tight mt-4 mb-2">
        Account Details
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 p-6 rounded-lg bg-[#0f0f0f] border border-neutral-800 grid grid-cols-2 gap-6 w-full max-w-4xl"
      >
        <InputField
          name="fullName"
          label="Full Name"
          register={register}
          error={errors.fullName}
        />

         <InputField
          name="email"
          label="Email"
          register={register}
          error={errors.email}
        />

        <CountrySelectField
          name="country"
          control={control}
          error={errors.country}
          label="Country"
        />

       

        <SelectField
          name="investmentGoals"
          label="Investment Goals"
          options={INVESTMENT_GOALS}
          control={control}
        />

        {/* <InputField
          name="currentPassword"
          type="password"
          label="Current Password"
          register={register}
          error={errors.currentPassword}
        /> */}

        <SelectField
          name="riskTolerance"
          label="Risk Tolerance"
          options={RISK_TOLERANCE_OPTIONS}
          control={control}
        />

        {/* <InputField
          name="newPassword"
          type="password"
          label="New Password"
          register={register}
          error={errors.newPassword}
        /> */}

        <SelectField
          name="preferredIndustry"
          label="Preferred Industry"
          options={PREFERRED_INDUSTRIES}
          control={control}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn col-span-2 w-full"
        >
          {isSubmitting ? "Updating..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
};

export default AccountDetails;
