"use client";

import Link from "next/link";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { UserRegisterSchema } from "@/schemas";
import { Button, Callout, Divider, Flex, Text, TextInput } from "@tremor/react"
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { registerUser } from "@/actions/create/register-user";
import { WrapperForm } from "./WrapperForm";
import { BeatLoading } from "../loadings/BeatLoading";

export const UserRegisterForm = () => {
      const [error, setError] = useState<string>("");
      const [success, setSuccess] = useState<string>("");

      const [isPending, startTransition] = useTransition();

      const form = useForm<z.infer<typeof UserRegisterSchema>>({
            resolver: zodResolver(UserRegisterSchema),
            defaultValues: {
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  password: ""
            },
      });

      const onSubmit = (values: z.infer<typeof UserRegisterSchema>) => {
            startTransition(() => {
                  startTransition(() => {
                        registerUser(values)
                              .then((data) => {
                                    if (data.error) {
                                          setError(data.error)
                                    };

                                    if (data.success) {
                                          setSuccess(data.success)
                                    };
                              })
                              .catch(() =>
                                    setError("An internal server error has occurred.")
                              );
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
                  titleForm={!success ? "Create an account" : "Email successfully sent"}
                  descriptionForm={!success ? "Fill out the form below to create an account" : ""}
            >
                  <form
                        className={"w-full space-y-4"}
                        onSubmit={form.handleSubmit(onSubmit)}
                        onChange={cleanMessages}
                  >
                        {!success && (
                              <Flex className={"flex-col space-y-4 items-start"}>
                                    <TextInput
                                          type={"text"}
                                          name={"firstName"}
                                          placeholder={"First Name"}
                                          onChange={(e) => form.setValue("firstName", e.target.value)}
                                          error={form.formState.errors.firstName ? (true) : (false)}
                                          errorMessage={form.formState.errors.firstName?.message}
                                          disabled={isPending}
                                          autoComplete={"off"}
                                    />
                                    <TextInput
                                          type={"text"}
                                          name={"lastName"}
                                          placeholder={"Last Name"}
                                          onChange={(e) => form.setValue("lastName", e.target.value)}
                                          error={form.formState.errors.lastName ? (true) : (false)}
                                          errorMessage={form.formState.errors.lastName?.message}
                                          disabled={isPending}
                                          autoComplete={"off"}
                                    />
                                    <TextInput
                                          type={"email"}
                                          name={"email"}
                                          placeholder={"Your Email"}
                                          onChange={(e) => form.setValue("email", e.target.value)}
                                          error={form.formState.errors.email ? (true) : (false)}
                                          errorMessage={form.formState.errors.email?.message}
                                          disabled={isPending}
                                          autoComplete={"off"}
                                    />
                                    <PhoneInput
                                          country={'us'}
                                          value={form.watch('phone')}
                                          onChange={(phone) => form.setValue('phone', phone)}
                                          inputStyle={{ width: '100%', }}
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
                        )}
                        
                        <Divider />

                        <Flex flexDirection={"col"} >
                              {isPending ? (
                                    <BeatLoading />
                              ) : error ? (
                                    <Callout
                                          className={"w-full"}
                                          title={error}
                                          color={"rose-500"}
                                    />
                              ) : success ? (
                                    <Callout
                                          className={"w-full"}
                                          title={success}
                                          color={"teal"}
                                    />
                              ) : (
                                    <Flex className={"flex-col space-y-4"}>
                                          <h3 className={"text-xs text-slate-400"}>
                                                By clicking Register, you agree to our <b>Terms</b>,
                                                <b>Privacy Policy</b> and <b>Cookie Policy</b>.
                                          </h3>

                                          <Button
                                                className={"w-full bg-slate-800 hover:bg-slate-900 border-slate-950 hover:border-slate-900"}
                                                type={"submit"}
                                          >
                                                Register
                                          </Button>
                                    </Flex>
                              )}
                        </Flex>
                  </form>

                  <div className="text-center flex flex-col sm:flex-row p-4" style={{ gap: '5px' }}>
                        <Text> Already have an account?&nbsp;</Text>
                        <Link href={"/auth/login"} className='text-tremor-default text-blue-600 underline'>
                              Sign In Now
                        </Link>
                  </div>
            </WrapperForm>
      );
};