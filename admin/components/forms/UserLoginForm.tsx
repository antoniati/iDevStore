"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, Divider, Flex, Text, TextInput } from "@tremor/react"
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { BeatLoading, WrapperForm } from "@/components";
import { LoginSchema } from "@/schemas";
import { loginSession } from "@/actions/create/login-session";

export const UserLoginForm = () => {
      const [error, setError] = useState<string>("");
      const [success, setSuccess] = useState<string>("");
      const [showTwoFactor, setShowTwoFactor] = useState(false);

      const [isPending, startTransition] = useTransition();

      const searchParams = useSearchParams();

      const callbackUrl = searchParams.get("callbackUrl");

      const form = useForm<z.infer<typeof LoginSchema>>({
            resolver: zodResolver(LoginSchema),
            defaultValues: {
                  email: "",
                  password: ""
            },
      });

      const onSubmit = (values: z.infer<typeof LoginSchema>) => {
            startTransition(() => {
                  loginSession(values, callbackUrl)
                        .then((data) => {
                              if (data?.error) {
                                    setError(data.error)
                              }

                              if (data?.success) {
                                    setSuccess(data.success)
                              }

                              if (data?.twoFactor) {
                                    setShowTwoFactor(true)
                              }
                        })
                        .catch(() =>
                              setError("Oops! An internal server error has occurred. Please check the situation and try again.")
                        );
            });
      };

      const cleanMessages = () => {
            form.clearErrors();
            setSuccess("");
            setError("");
      };

      const router = useRouter();

      return (
            <WrapperForm
                  titleForm={showTwoFactor ? ("Two-factor authentication") : ("Welcome back")}
                  descriptionForm={showTwoFactor ? ("Please enter the authentication code we sent to your email") : "Sign in to your account and enjoy an improved management experience."}
            >
                  <form
                        className={"w-full space-y-4"}
                        onSubmit={form.handleSubmit(onSubmit)}
                        onChange={cleanMessages}
                  >
                        {showTwoFactor && (
                              <TextInput
                                    type={"text"}
                                    name={"code"}
                                    placeholder={"123456"}
                                    onChange={(e) => form.setValue("code", e.target.value)}
                                    error={form.formState.errors.code ? (true) : (false)}
                                    errorMessage={"Este campo é obrigatório"}
                                    disabled={isPending}
                                    autoComplete={"off"}
                              />
                        )}

                        {!showTwoFactor && (
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

                                    {!isPending && (
                                          <Button
                                                type={"button"}
                                                size={"xs"}
                                                variant={"light"}
                                                onClick={() => router.push("/auth/reset")}
                                                className={"ml-1"}
                                          >
                                                <span className={"text-tremor-label"}>
                                                      Forgot Password ?
                                                </span>
                                          </Button>
                                    )}
                              </Flex>
                        )}

                        <Divider />

                        <Flex flexDirection={"col"} >
                              {isPending ? (
                                    <BeatLoading />
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
                                    <Button
                                          className={showTwoFactor ? "w-full bg-slate-800 hover:bg-slate-900 border-slate-950 hover:border-slate-900" : "w-full duration-300"}
                                          type={"submit"}
                                          disabled={isPending}
                                    >
                                          {!showTwoFactor
                                                ? ("Sign In")
                                                : ("Confirm")
                                          }
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