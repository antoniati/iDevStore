"use client"

import Link from "next/link";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { Button, Callout, Flex, TextInput } from "@tremor/react";
import { ResetSchema } from "@/schemas";
import { handleRequestNewPassword } from "@/actions/create/request-new-password";
import { WrapperForm } from "./WrapperForm";
import { BeatLoading } from "../loadings/BeatLoading";

export const FormToRequestNewPassword = () => {
      const [error, setError] = useState<string>("");
      const [success, setSuccess] = useState<string>("");

      const [isPending, startTransition] = useTransition();

      const form = useForm<z.infer<typeof ResetSchema>>({
            resolver: zodResolver(ResetSchema),
            defaultValues: { email: "" },
      });

      const onSubmit = (values: z.infer<typeof ResetSchema>) => {
            startTransition(() => {
                  handleRequestNewPassword(values)
                        .then((data) => {
                              if (data.error) {
                                    setError(data?.error);
                              };

                              if (data.success) {
                                    setSuccess(data?.success);
                              };
                        });
            });
      };

      const cleanMessages = () => {
            form.clearErrors();
            setSuccess("");
            setError("");
      };

      return (
            <WrapperForm
                  titleForm={isPending ? ("Sending E-mail...") : !success ? ("Forgot your password? Don't worry.") : ("")}
                  descriptionForm={!isPending && !success ? ("Enter your email and click the `Send Email` button to receive password reset instructions") : ("")}
            >
                  <form
                        className={"w-full space-y-4"}
                        onSubmit={form.handleSubmit(onSubmit)}
                        onChange={cleanMessages}
                  >
                        <TextInput
                              type={"email"}
                              name={"email"}
                              placeholder={"youremail@example.com"}
                              onChange={(e) => form.setValue("email", e.target.value)}
                              error={form.formState.errors.email ? (true) : (false)}
                              errorMessage={form.formState.errors.email?.message}
                              disabled={isPending}
                        />

                        <Flex flexDirection="col" >
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
                                          disabled={isPending || form.getValues("email") === ""}
                                          className={"w-full bg-slate-800 hover:bg-slate-900 border-slate-950 hover:border-slate-900"}
                                    >
                                          Send Email
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