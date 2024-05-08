"use client";

import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useState, useTransition } from "react";
import { BsImageFill, BsPersonGear, } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { UserEditSchema } from "@/schemas";
import { Button, Callout, Divider, Flex, Grid, TextInput } from "@tremor/react"
import { AnimBottomToTop, BeatLoading, BounceLoading, TitleSection } from "@/components";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useUserDataById } from "@/hooks/use-user-data";
import { updateUser } from "@/actions/update/update-user";
import { useUploadSingleFile } from "@/hooks/use-uploaded-files";
import Image from "next/image";

export const UserEditForm = ({ userId }: { userId: string }) => {
      const { user } = useUserDataById(userId);

      const router = useRouter();

      const [currentImage, setCurrentImage] = useState<string>(user?.image ?? "/unknow-profile-image.png");
      const [error, setError] = useState<string>("");
      const [success, setSuccess] = useState<string>("");
      const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false);

      const [isPending, startTransition] = useTransition();

      const {
            uploadedFile,
            isUploading,
            handleUploadSingleFile,
            removeFile,
      } = useUploadSingleFile();

      const form = useForm<z.infer<typeof UserEditSchema>>({
            resolver: zodResolver(UserEditSchema)
      });

      const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];

            if (file) {
                  const imageURL = URL.createObjectURL(file);
                  setCurrentImage(imageURL);
            }

            await handleUploadSingleFile(event);
      };

      useEffect(() => {
            if (uploadedFile) {
                  setCurrentImage(uploadedFile);
            }
      }, [uploadedFile]);

      useEffect(() => {
            setIsLoadingPage(true);

            if (user?.image) {
                  setCurrentImage(user.image);
            }

            if (user) {
                  form.reset({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        image: currentImage,
                        phone: user.phone ?? "",
                  });
            };

            setIsLoadingPage(false);
      }, [user]);

      const onSubmit = (values: z.infer<typeof UserEditSchema>) => {
            values.image = currentImage;

            startTransition(() => {
                  startTransition(() => {
                        updateUser(values, userId)
                              .then((data) => {
                                    if (data.error) {
                                          setError(data.error)
                                    };

                                    if (data.success) {
                                          setSuccess(data.success)
                                          console.log(values.image?.toString());
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
                                    icon={BsPersonGear}
                                    title="Profile Settings"
                              />
                              <form
                                    className={"w-full space-y-4"}
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    onChange={cleanMessages}
                              >
                                    {!success && (
                                          <Flex className="w-full items-start justify-start flex-col" style={{ gap: "20px" }}>
                                                <div className="space-y-4">
                                                      <h3 className="text-tremor-label font-bold text-slate-800 ml-1">
                                                            Photo
                                                      </h3>
                                                      <label className="cursor-pointer rounded-tremor-full" >
                                                            <AnimBottomToTop>

                                                                  {isUploading ? (
                                                                        <div className="p-4">
                                                                              <BounceLoading />
                                                                        </div>
                                                                  ) : (
                                                                        <div style={{ width: "120px", height: '120px', position: "relative" }}>
                                                                              <img
                                                                                    src={currentImage}
                                                                                    alt={"Profile Photo"}
                                                                                    className="cover rounded-tremor-full border border-slate-600"
                                                                              />
                                                                              <span className="hoverUploadProfilePhoto" >
                                                                                    <Flex className="flex-col items-center justify-center space-y-1 font-medium text-center text-white p-4 mt-4">
                                                                                          <BsImageFill size={24} />
                                                                                          <span> Upload </span>
                                                                                    </Flex>
                                                                              </span>
                                                                        </div>
                                                                  )}

                                                            </AnimBottomToTop>


                                                            <input
                                                                  className="hidden"
                                                                  type="file"
                                                                  id="file"
                                                                  name="file"
                                                                  accept="images/*"
                                                                  multiple
                                                                  onChange={handleFileChange}
                                                            />
                                                      </label>
                                                      <h4 className="text-tremor-label">
                                                            Click to upload profile photo
                                                      </h4>
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
                                                            Save
                                                      </Button>
                                                      <Button

                                                            type={"button"}
                                                            variant="secondary"
                                                            onClick={handleBackPage}
                                                      >
                                                            Back
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
                  )
                  }
            </AnimBottomToTop >
      );
};
