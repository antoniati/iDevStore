"use client";

import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { BsBoxSeam, BsTrashFill } from "react-icons/bs";
import { Button, Callout, Divider, Flex, Select, SelectItem, TextInput, Textarea } from "@tremor/react";
import { BeatLoading, AnimBottomToTop, TitleSection } from "@/components";
import { registerProduct } from "@/actions/create/register-product";
import { ProductSchema } from "@/schemas";
import { useCategoryData } from "@/hooks/use-category-data";

interface PropsOfProperties {
      name: string;
      values: string[];
}[];

export const ProductRegisterForm = () => {
      const { categories } = useCategoryData();

      const [properties, setProperties] = useState<PropsOfProperties[] | []>([]);
      const [success, setSuccess] = useState<string>("");
      const [error, setError] = useState<string>("");
      const [isPending, setIsPending] = useState<boolean>(false);
      const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false);
      const [transitioning, startTransition] = useTransition();

      const router = useRouter();

      const form = useForm<z.infer<typeof ProductSchema>>({
            resolver: zodResolver(ProductSchema),
      });

      const onSubmit = (values: z.infer<typeof ProductSchema>) => {
            setIsPending(true);

            values.properties = properties;

            startTransition(() => {
                  registerProduct(values)
                        .then((data) => {
                              if (data?.error) {
                                    setError(data.error);
                              } else if (data?.success) {
                                    setSuccess(data.success);
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

      const handleBackPage = () => {
            setIsLoadingPage(true);
            router.push("/products");
      };

      const addProperty = () => {
            setProperties((prev: PropsOfProperties[]) => {
                  return [...prev, { name: '', values: [] }];
            })
      }

      const removeProperty = (indexToRemove: number) => {
            setProperties((prev) => prev.filter((_, index) => index !== indexToRemove));
      };

      const handlePropertyNameChange = (index: number, newName: string) => {
            setProperties((prev) => {
                  const updatedProperties = [...prev];
                  updatedProperties[index].name = newName;
                  return updatedProperties;
            });
      };

      const handlePropertyValuesChange = (index: number, newValues: string) => {
            // Split the string 'newValues' using commas as separators and remove extra spaces
            const valuesArray = newValues ? newValues.split(',').map((value) => value.trim()) : [];

            // Update the property in the 'properties' state
            setProperties((prev) => {
                  const updatedProperties = [...prev];
                  // Update the values of the property corresponding to the index
                  updatedProperties[index].values = valuesArray; // 'values' is an array
                  return updatedProperties;
            });
      };

      const handlePriceChangeToUSD = (inputName: keyof z.infer<typeof ProductSchema>) => (
            event: React.ChangeEvent<HTMLInputElement>
      ) => {
            const inputValue = event.target.value;

            // Remove all non-numeric characters
            const numericValue = inputValue.replace(/[^\d]/g, '');

            // Convert to number (divided by 100 to consider two decimal places)
            const valueAsNumber = Number(numericValue) / 100;

            // Format to US Dollar
            let formattedValue = valueAsNumber.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
            });

            // If value is empty, set to empty string
            if (numericValue === '') {
                  formattedValue = '';
            }

            // Update the value in the input field
            event.target.value = formattedValue;

            // Update the value in the form
            form.setValue(inputName, formattedValue);
      };

      return (
            <AnimBottomToTop>
                  <div className="w-full space-y-4">
                        <TitleSection
                              icon={BsBoxSeam}
                              title="Register Product"
                        />
                        <form
                              className={"w-full flex flex-col items-center justify-center"}
                              onSubmit={form.handleSubmit(onSubmit)}
                              onChange={cleanMessages}
                        >
                              {!success && (
                                    <Flex
                                          className={"flex-col overflow-auto pb-2 space-y-4 items-start"}
                                          style={{
                                                height: "auto",
                                                maxHeight: "420px",
                                                paddingInline: "5px"
                                          }}
                                    >
                                          <div className="w-full space-y-1">
                                                <h3 className="text-tremor-label font-bold text-slate-800 ml-1">
                                                      Enter Product Name
                                                </h3>
                                                <TextInput
                                                      className="p-1"
                                                      type={"text"}
                                                      name={"name"}
                                                      placeholder={"Product Name"}
                                                      onChange={(e) => form.setValue("name", e.target.value)}
                                                      error={!!form.formState.errors.name}
                                                      errorMessage={form.formState.errors.name?.message}
                                                      disabled={isPending}
                                                      autoComplete={"off"}
                                                />
                                          </div>

                                          <div className="w-full space-y-1">
                                                <h3 className="text-tremor-label font-bold text-slate-800 ml-1">
                                                      Select a Category
                                                </h3>
                                                <Select
                                                      className="border border-slate-300 rounded-tremor-default"
                                                      name={"category"}
                                                      onValueChange={(value: string) => {
                                                            const selectedCategory = categories.find((cat) => cat.id === value);
                                                            form.setValue("categoryId", value);
                                                            form.setValue("categoryName", selectedCategory ? selectedCategory.name : "");
                                                      }}
                                                      placeholder="Click to select"
                                                >
                                                      {categories.map((category) => (
                                                            <SelectItem key={category.id} value={category.id}>
                                                                  {category.name}
                                                            </SelectItem>
                                                      ))}
                                                </Select>

                                          </div>

                                          <div className="w-full space-y-1">
                                                <h3 className="text-tremor-label font-bold text-slate-800 ml-1">
                                                      Enter Sales Value
                                                </h3>
                                                <TextInput
                                                      className="p-1"
                                                      type={"text"}
                                                      name={"price"}
                                                      placeholder={"$ 0.00"}
                                                      onChange={handlePriceChangeToUSD('price')}
                                                      error={!!form.formState.errors.name}
                                                      errorMessage={form.formState.errors.price?.message}
                                                      disabled={isPending}
                                                />
                                          </div>

                                          <div className="space-y-1">
                                                <h3 className="text-tremor-label font-bold text-slate-800 ml-1">
                                                      Properties
                                                </h3>
                                                {properties.length > 0 && properties.map((property, index) => (
                                                      <div key={index} className="flex items-center justify-start space-x-2">
                                                            <Flex className="sm:flex-row flex-col items-start justify-start" style={{ gap: '5px' }}>
                                                                  <TextInput
                                                                        className="max-w-sm"
                                                                        type="text"
                                                                        value={property.name}
                                                                        onChange={e => handlePropertyNameChange(index, e.target.value)}
                                                                        placeholder="Property name (e.g. color)"
                                                                  />
                                                                  <TextInput
                                                                        className="max-w-sm"
                                                                        type="text"
                                                                        value={property.values.join(', ')}
                                                                        onChange={e => handlePropertyValuesChange(index, e.target.value)}
                                                                        placeholder="Comma separated values"
                                                                  />
                                                            </Flex>
                                                            <Button
                                                                  icon={BsTrashFill}
                                                                  type="button"
                                                                  className="text-white bg-slate-400 hover:bg-slate-500 border-slate-500 transition-all duration-300 hover:border-slate-500"
                                                                  onClick={() => removeProperty(index)}
                                                            />
                                                      </div>
                                                ))}
                                                <Button
                                                      onClick={addProperty}
                                                      type="button"
                                                      className="p-2"
                                                      variant="light"
                                                >
                                                      + Add properties
                                                </Button>
                                          </div>

                                          <div className="w-full space-y-1">
                                                <h3 className="text-tremor-label font-bold text-slate-800 ml-1">
                                                      Describe the product
                                                </h3>
                                                <Textarea
                                                      rows={6}
                                                      maxLength={200}
                                                      name={"description"}
                                                      placeholder={"Enter a short, informative product description..."}
                                                      onChange={(e) => form.setValue("description", e.target.value)}
                                                      error={!!form.formState.errors.name}
                                                      errorMessage={form.formState.errors.description?.message}
                                                      disabled={isPending}
                                                />
                                          </div>
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
                                                      Register Product
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