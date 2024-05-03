"use client";

import Link from "next/link";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, Divider, Flex, Text, TextInput } from "@tremor/react"
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { SyncLoading, WrapperForm } from "@/components";
import { LoginSchema } from "@/schemas";

export const UserLoginForm = () => {
      const [error, setError] = useState<string>("");
      const [success, setSuccess] = useState<string>("");

      const [isPending, startTransition] = useTransition();

      const form = useForm<z.infer<typeof LoginSchema>>({
            resolver: zodResolver(LoginSchema),
            defaultValues: {
                  email: "",
                  password: ""
            },
      });

      const onSubmit = (values: z.infer<typeof LoginSchema>) => {
            startTransition(() => {
                  console.log(values)
            });
      };

      const cleanMessages = () => {
            form.clearErrors();
            setSuccess("");
            setError("");
      };

      return (
            <WrapperForm
                  titleForm={"Welcome Back"}
                  descriptionForm={"Sign in to your account and enjoy an improved management experience."}
            >
                  <form
                        className={"w-full space-y-4"}
                        onSubmit={form.handleSubmit(onSubmit)}
                        onChange={cleanMessages}
                  >
                        <Flex className={"flex-col space-y-4 items-start"}>
                              <TextInput
                                    type={"email"}
                                    name={"email"}
                                    placeholder={"Your E-mail"}
                                    onChange={(e) => form.setValue("email", e.target.value)}
                                    error={form.formState.errors.email ? (true) : (false)}
                                    errorMessage={form.formState.errors.email?.message}
                                    disabled={isPending}
                                    autoComplete={"off"}
                              />
                              <TextInput
                                    type={"password"}
                                    name={"password"}
                                    placeholder={"Password"}
                                    onChange={(e) => form.setValue("password", e.target.value)}
                                    error={form.formState.errors.password ? (true) : (false)}
                                    errorMessage={form.formState.errors.password?.message}
                                    disabled={isPending}
                                    autoComplete={"off"}
                              />
                        </Flex>

                        <Divider />

                        <Flex flexDirection={"col"} >
                              {isPending ? (
                                    <SyncLoading />
                              ) : error ? (
                                    <Callout
                                          className={"w-full"}
                                          title={error}
                                          color={"red"}
                                    />
                              ) : success ? (
                                    <Callout
                                          className={"w-full"}
                                          title={success}
                                          color={"rose-500"}
                                    />
                              ) : (
                                    <Button type={"submit"} className="w-full ">
                                          Sign in
                                    </Button>
                              )}
                        </Flex>
                  </form>

                  <div className="text-center flex flex-col sm:flex-row p-4" style={{ gap: '5px' }}>
                        <Text>Don't have an account?</Text>
                        <Link href={"/auth/register"} className='text-tremor-default text-blue-600 underline'>
                              Register Now
                        </Link>
                  </div>
            </WrapperForm>
      );
};    