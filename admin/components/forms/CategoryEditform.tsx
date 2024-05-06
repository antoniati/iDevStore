"use client";

import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { BsLayers } from "react-icons/bs";
import { Button, Callout, Divider, Flex, Select, SelectItem, TextInput, Title } from "@tremor/react";
import { useCategoryData, useCategoryDataById } from "@/hooks/use-category-data";
import { BeatLoading, AnimBottomToTop, TitleSection } from "@/components";
import { updateCategory } from "@/actions/update/update-category";
import { CategorySchema } from "@/schemas";

export const CategoryEditForm = ({ categoryId }: { categoryId: string }) => {
      const [success, setSuccess] = useState<string>("");
      const [error, setError] = useState<string>("");
      const [isPending, setIsPending] = useState<boolean>(false);
      const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false);
      const [isModified, setIsModified] = useState<boolean>(false);
      const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

      const [transitioning, startTransition] = useTransition();

      const { categories } = useCategoryData();
      const { category } = useCategoryDataById(categoryId);

      const router = useRouter();

      const initialData = {
            id: category?.id || "",
            name: category?.name || "",
            parent: category?.parent ?? undefined,
      };

      const form = useForm<z.infer<typeof CategorySchema>>({
            resolver: zodResolver(CategorySchema),
            defaultValues: { ...initialData },
      });

      useEffect(() => {
            if (category) {
                  form.setValue("name", category.name);
                  form.setValue("parent", category.parent ?? undefined);
                  setIsDataLoaded(true)
            }
      }, [category, form]);

      if (!isDataLoaded) {
            return <BeatLoading />;
      };

      const onSubmit = (values: z.infer<typeof CategorySchema>) => {
            setIsPending(true);

            if (category && category.id) {
                  startTransition(() => {
                        updateCategory(values, category.id)
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
            } else {
                  setError("Please enter a valid ID to edit the category.");
            };
      };

      const cleanMessages = () => {
            form.clearErrors();
            setSuccess("");
            setError("");
      };

      const handleBackPage = () => {
            setIsLoadingPage(true);
            router.push("/category");
      };

      return (
            <AnimBottomToTop>
                  <div className="w-full space-y-4">
                        <TitleSection
                              icon={BsLayers}
                              title="Edit Category"
                        />
                        <form
                              className={"w-full flex flex-col items-center justify-center"}
                              onSubmit={form.handleSubmit(onSubmit)}
                              onChange={cleanMessages}
                        >
                              {!success && (
                                    <Flex className={"flex-col pb-2 space-y-4 items-start justify-start"}>
                                          <div className="w-full space-y-1">
                                                <h3 className="text-tremor-label font-bold text-slate-800 ml-1">
                                                      Enter Category Name
                                                </h3>
                                                <TextInput
                                                      className="defaultInput"
                                                      type={"text"}
                                                      name={"name"}
                                                      placeholder={"Category Name"}
                                                      onChange={(e) => {
                                                            form.setValue("name", e.target.value);
                                                            setIsModified(e.target.value.trim() !== initialData.name);
                                                      }}
                                                      error={form.formState.errors.name ? true : false}
                                                      errorMessage={form.formState.errors.name?.message}
                                                      disabled={isPending}
                                                      autoComplete={"off"}
                                                      defaultValue={initialData.name}
                                                />
                                          </div>
                                          <div className="w-full space-y-1">
                                                <h3 className="text-tremor-label font-bold text-slate-800 ml-1">
                                                      Select a Subcategory
                                                </h3>
                                                <Select
                                                      className="border border-slate-300 rounded-tremor-default"
                                                      name={"parent"}
                                                      onValueChange={(value: string) => {
                                                            form.setValue("parent", value);
                                                            setIsModified(value !== initialData.parent);
                                                      }}
                                                      placeholder={"Select a subcategory"}
                                                      defaultValue={initialData.parent}
                                                >
                                                      {categories.length > 0 &&
                                                            categories.map((category) => (
                                                                  <SelectItem key={category.id} value={category.name}>
                                                                        {category.name}
                                                                  </SelectItem>
                                                            ))}
                                                </Select>
                                          </div>
                                    </Flex>
                              )}

                              <Divider />

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
                                                      disabled={!isModified || isPending}
                                                >
                                                      Edit Category
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
            </AnimBottomToTop>
      );
};