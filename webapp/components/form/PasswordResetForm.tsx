"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { Button, Callout, Divider, Flex, TextInput } from "@tremor/react";
import { handleResetPassword } from "@/actions/create/password-reset";
import { WrapperForm } from "./WrapperForm";
import { BeatLoading } from "../loadings/BeatLoading";

export const PasswordResetForm = () => {
      const [error, setError] = useState<string>("");
      const [success, setSuccess] = useState<string>("");

      const [isPending, startTransition] = useTransition();

      const searchParams = useSearchParams();

      const token = searchParams.get("token");

      const form = useForm<z.infer<typeof NewPasswordSchema>>({
            resolver: zodResolver(NewPasswordSchema),
            defaultValues: { password: "" },
      });

      const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
            startTransition(() => {
                  handleResetPassword(values, token)
                        .then((data) => {
                              if (data.error) {
                                    setError(data.error);
                              };

                              if (data.success) {
                                    setSuccess(data.success);
                              };
                        });
            });
      };

      const cleanMessages = () => {
            form.clearErrors("password");
            setSuccess("");
            setError("");
      };

      return (
            <WrapperForm
                  titleForm={!success && !isPending ? ("Password Reset") : isPending ? ("Updating Password...") : ("")}
                  descriptionForm={!isPending && !success ? ("Enter a new password to update your password.") : ""}
            >
                  <form
                        className={"w-full space-y-4"}
                        onSubmit={form.handleSubmit(onSubmit)}
                        onChange={cleanMessages}
                  >
                        {!success && (
                              <>
                                    <TextInput
                                          type={"password"}
                                          name={"password"}
                                          placeholder={"New Password"}
                                          onChange={(e) => form.setValue("password", e.target.value)}
                                          error={form.formState.errors.password ? (true) : (false)}
                                          errorMessage={form.formState.errors.password?.message}
                                          disabled={isPending}
                                    />
                                    <Divider />
                              </>
                        )}

                        <Flex flexDirection={"col"} >
                              {isPending ? (
                                    <BeatLoading />
                              ) : error ? (
                                    <Callout
                                          title={`${error}`}
                                          color={"rose-500"}
                                          className={"w-full"}
                                    />
                              ) : success ? (
                                    <Callout
                                          title={`${success}`}
                                          color={"teal"}
                                          className={"w-full"}
                                    />
                              ) : (
                                    <Button
                                          type={"submit"}
                                          disabled={isPending}
                                          className={"w-full bg-slate-800 hover:bg-slate-900 border-slate-950 hover:border-slate-900"}
                                    >
                                          Update Password
                                    </Button>
                              )}
                        </Flex>
                  </form>

                  {!isPending && (
                        <Link href={"/auth/login"} className="text-tremor-default text-blue-600 p-4 underline">
                              Back to login
                        </Link>
                  )}
            </WrapperForm>
      );
};