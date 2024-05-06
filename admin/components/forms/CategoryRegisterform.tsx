"use client";

import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react"
import { BsLayers } from "react-icons/bs";
import { CategorySchema } from "@/schemas";
import { Button, Callout, Divider, Flex, Grid, Select, SelectItem, TextInput } from "@tremor/react";
import { AnimBottomToTop, BeatLoading, TitleSection } from "@/components"
import { registerCategory } from "@/actions/create/register-category";
import { useCategoryData } from "@/hooks/use-category-data";

export const CategoryRegisterForm = () => {
      const [success, setSuccess] = useState<string>("");
      const [error, setError] = useState<string>("");
      const [isPending, setIsPending] = useState<boolean>(false);
      const [isModified, setIsModified] = useState<boolean>(false);
      const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false);

      const [transitioning, startTransition] = useTransition();

      const form = useForm<z.infer<typeof CategorySchema>>({
            resolver: zodResolver(CategorySchema),
            defaultValues: {},
      });

      const { categories } = useCategoryData();

      const onSubmit = (values: z.infer<typeof CategorySchema>) => {
            setIsPending(true);

            startTransition(() => {
                  registerCategory(values)
                        .then((data) => {
                              if (data?.error) {
                                    setError(data.error);
                              } else if (data?.success) {
                                    setSuccess(data.success);
                                    setIsModified(false);
                              }
                        })
                        .catch((error) => {
                              setError("Error submitting form.");
                              console.error("Error submitting form:", error);
                        })
                        .finally(() => {
                              setIsPending(false);
                        });
            });
      };

      const cleanMessages = () => {
            form.clearErrors();
            setSuccess("");
            setError("");
      };

      const router = useRouter();

      const handleBackPage = () => {
            setIsLoadingPage(true);
            router.push("/category")
      };

      return (
            <AnimBottomToTop>
                  <div className="w-full space-y-4">
                        <TitleSection
                              icon={BsLayers}
                              title="Register Category"
                        />

                        <form
                              className={"w-full flex flex-col items-center justify-center space-y-4 mt-4"}
                              onSubmit={form.handleSubmit(onSubmit)}
                              onChange={cleanMessages}
                        >
                              {!success && (
                                    <Grid numItems={1} numItemsMd={2} style={{ gap: "20px", width: "100%" }}>
                                          <div className="w-full space-y-1">
                                                <h3 className="text-tremor-label font-bold text-slate-800 ml-1">
                                                      Enter Category Name
                                                </h3>
                                                <TextInput
                                                      className="p-1"
                                                      type={"text"}
                                                      name={"name"}
                                                      placeholder={"Category Name"}
                                                      onChange={(e) => {
                                                            form.setValue("name", e.target.value);
                                                            setIsModified(e.target.value.trim().length > 0);
                                                      }}
                                                      error={form.formState.errors.name ? (true) : (false)}
                                                      errorMessage={form.formState.errors.name?.message}
                                                      disabled={isPending}
                                                      autoComplete={"off"}
                                                />
                                          </div>

                                          <div className="w-full space-y-1">
                                                <h3 className="text-tremor-label font-bold text-slate-800 ml-1">
                                                      Select a Subcategory
                                                </h3>
                                                <Select
                                                      className="p-1 border border-slate-300 rounded-tremor-default"
                                                      name={"parent"}
                                                      onValueChange={(value: string) => form.setValue("parent", value)}
                                                      placeholder="Click to select"
                                                >
                                                      {categories.map(category => (
                                                            <SelectItem
                                                                  key={category.id}
                                                                  value={category.name}
                                                            >
                                                                  {category.name}
                                                            </SelectItem>
                                                      ))}
                                                </Select>
                                          </div>
                                    </Grid>
                              )}

                              <Divider />

                              <Flex className="flex-col">
                                    {isPending && !success ? (
                                          <BeatLoading />
                                    ) : error ? (
                                          <Flex className="w-full flex-col space-y-1">
                                                <AnimBottomToTop>
                                                      <Callout
                                                            className={"w-full"}
                                                            title={error}
                                                            color={"red"}
                                                      />
                                                </AnimBottomToTop>
                                          </Flex>
                                    ) : success ? (
                                          <Flex className="w-full items-start flex-col space-y-4">
                                                <AnimBottomToTop>
                                                      <Callout
                                                            className={"w-full"}
                                                            title={`${success}`}
                                                            color={"teal"}
                                                      />
                                                </AnimBottomToTop>

                                                {!isLoadingPage ? (
                                                      <Button
                                                            type={"button"}
                                                            onClick={handleBackPage}
                                                      >
                                                            OK
                                                      </Button>
                                                ) : (
                                                      <BeatLoading />
                                                )}
                                          </Flex>
                                    ) : (
                                          <Flex className="justify-start space-x-2">
                                                <Button
                                                      size="lg"
                                                      type={"submit"}
                                                      disabled={!isModified || isPending}
                                                >
                                                      Save  Register
                                                </Button>
                                                <Button
                                                      variant="secondary"
                                                      size="lg"
                                                      type={"button"}
                                                      onClick={handleBackPage}
                                                      disabled={isPending}
                                                >
                                                      Back
                                                </Button>
                                          </Flex>
                                    )}
                              </Flex>
                        </form>
                  </div>
            </AnimBottomToTop>
      );
};