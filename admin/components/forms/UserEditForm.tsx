"use client";

import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { BsPerson } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { UserEditSchema } from "@/schemas";
import { Button, Callout, Divider, Flex, Grid, TextInput } from "@tremor/react"
import { AnimBottomToTop, BeatLoading, TitleSection } from "@/components";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useUserDataById } from "@/hooks/use-user-data";
import { updateUser } from "@/actions/update/update-user";
import Image from "next/image";

export const UserEditForm = ({ userId }: { userId: string }) => {
      const { user } = useUserDataById(userId);

      const router = useRouter();

      const [error, setError] = useState<string>("");
      const [success, setSuccess] = useState<string>("");
      const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false);

      const [isPending, startTransition] = useTransition();

      const form = useForm<z.infer<typeof UserEditSchema>>({
            resolver: zodResolver(UserEditSchema)
      });

      useEffect(() => {
            setIsLoadingPage(true);

            if (user) {
                  form.reset({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        phone: user.phone ?? "",
                  });
            }

            setIsLoadingPage(false);
      }, [user]);

      const onSubmit = (values: z.infer<typeof UserEditSchema>) => {
            startTransition(() => {
                  startTransition(() => {
                        updateUser(values, userId)
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


      const handleBackPage = () => {
            setIsLoadingPage(true);
            router.push("/dashboard");
      };

      return (
            <AnimBottomToTop>
                  {!isLoadingPage ? (
                        <div className="w-full space-y-4">
                              <TitleSection
                                    icon={BsPerson}
                                    title="Edit User"
                              />
                              <form
                                    className={"w-full space-y-4"}
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    onChange={cleanMessages}
                              >
                                    {!success && (
                                          <Flex className="w-full items-start justify-start flex-col sm:flex-row" style={{ gap: "20px" }}>
                                                <div className="mr-4 space-y-1">
                                                      <h3 className="text-tremor-label font-bold text-slate-800 ml-1">
                                                            Photo
                                                      </h3>
                                                      {/* TODO: UPLOAD USER IMAGE */}
                                                      {user?.image ? (
                                                            <Image
                                                                  alt={`Foto de ${user.firstName} ${user.lastName}`}
                                                                  src={user.image}
                                                                  width={100}
                                                                  height={100}
                                                            />
                                                      ) : (
                                                            <div>
                                                                  <div className="border-2 rounded-tremor-full cursor-pointer text-center flex flex-col items-center justify-center bg-slate-200 border-slate-300" style={{ width: "126px", height: "126px" }}>
                                                                        <BsPerson size={24} />
                                                                  </div>
                                                            </div>
                                                      )}
                                                </div>

                                                <Grid numItems={1} numItemsMd={2} style={{ gap: "20px", width: "100%" }}>
                                                      <div className="w-full space-y-1">
                                                            <h3 className="text-tremor-label font-bold text-slate-800 ml-1">
                                                                  First Name
                                                            </h3>
                                                            <TextInput
                                                                  className="p-1"
                                                                  type={"text"}
                                                                  name={"firstName"}
                                                                  placeholder={"First Name"}
                                                                  value={form.watch("firstName")}
                                                                  onChange={(e) => form.setValue("firstName", e.target.value)}
                                                                  error={form.formState.errors.firstName ? (true) : (false)}
                                                                  errorMessage={form.formState.errors.firstName?.message}
                                                                  disabled={isPending}
                                                                  autoComplete={"off"}
                                                            />
                                                      </div>
                                                      <div className="w-full space-y-1">
                                                            <h3 className="text-tremor-label font-bold text-slate-800 ml-1">
                                                                  Last Name
                                                            </h3>
                                                            <TextInput
                                                                  className="p-1"
                                                                  type={"text"}
                                                                  name={"lastName"}
                                                                  placeholder={"Last Name"}
                                                                  value={form.watch("lastName")}
                                                                  onChange={(e) => form.setValue("lastName", e.target.value)}
                                                                  error={form.formState.errors.lastName ? (true) : (false)}
                                                                  errorMessage={form.formState.errors.lastName?.message}
                                                                  disabled={isPending}
                                                                  autoComplete={"off"}
                                                            />
                                                      </div>
                                                      <div className="w-full space-y-1">
                                                            <h3 className="text-tremor-label font-bold text-slate-800 ml-1">
                                                                  Your Email
                                                            </h3>
                                                            <TextInput
                                                                  className="p-1"
                                                                  type={"email"}
                                                                  name={"email"}
                                                                  placeholder={"Your Email"}
                                                                  value={form.watch("email")}
                                                                  onChange={(e) => form.setValue("email", e.target.value)}
                                                                  error={form.formState.errors.email ? (true) : (false)}
                                                                  errorMessage={form.formState.errors.email?.message}
                                                                  disabled={isPending}
                                                                  autoComplete={"off"}
                                                            />
                                                      </div>
                                                      <div className="w-full space-y-1">
                                                            <h3 className="text-tremor-label font-bold text-slate-800 ml-1">
                                                                  Phone Number
                                                            </h3>
                                                            <PhoneInput
                                                                  country={'us'}
                                                                  value={form.watch('phone')}
                                                                  onChange={(phone) => form.setValue('phone', phone)}
                                                                  inputStyle={{ width: '100%', height: '45px' }}
                                                            />
                                                      </div>
                                                </Grid>
                                          </Flex>
                                    )}

                                    {!success && (<Divider />)}

                                    <Flex flexDirection="col">
                                          {isPending && !success ? (
                                                <BeatLoading />
                                          ) : error ? (
                                                <Flex className="w-full flex-col space-y-1">
                                                      <Callout
                                                            className={"w-full"}
                                                            title={`${error}`}
                                                            color={"rose-500"}
                                                      />
                                                </Flex>
                                          ) : success ? (
                                                <Flex className="w-full items-start flex-col space-y-4">
                                                      <Callout
                                                            className={"w-full"}
                                                            title={`${success}`}
                                                            color={"teal"}
                                                      />
                                                      {!isLoadingPage ? (
                                                            <Button type={"button"} onClick={handleBackPage}>
                                                                  OK
                                                            </Button>
                                                      ) : (
                                                            <BeatLoading />
                                                      )}
                                                </Flex>
                                          ) : !isLoadingPage ? (
                                                <Flex className="justify-start space-x-2">
                                                      <Button
                                                            type={"submit"}
                                                            disabled={isPending}
                                                      >
                                                            Edit User
                                                      </Button>
                                                      <Button
                                                            type={"button"}
                                                            variant="secondary"
                                                            onClick={handleBackPage}
                                                      >
                                                            Cancel
                                                      </Button>
                                                </Flex>
                                          ) : (
                                                <BeatLoading />
                                          )}
                                    </Flex>
                              </form>
                        </div>
                  ) : (
                        <BeatLoading />
                  )}
            </AnimBottomToTop>
      );
};
