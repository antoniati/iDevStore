"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { OrderSchema } from "@/schemas";
import { Button, Callout, Card, Divider, Flex, TextInput, Title } from "@tremor/react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { BeatLoading } from "@/components";
import { registerOrder } from "@/actions/create/register-order";
import { BsClipboardData } from "react-icons/bs";
import { useCurrentUserByClientSide } from "@/hooks/use-client-side-user";

interface OrderFormProps {
      cartProducts: string[];
      clearCart: () => void;
};

export const OrderForm = ({ cartProducts, clearCart }: OrderFormProps) => {
      const [success, setSuccess] = useState<string>("");
      const [error, setError] = useState<string>("");
      const [isPending, setIsPending] = useState<boolean>(false);

      const [transitioning, startTransition] = useTransition();

      const currentUser = useCurrentUserByClientSide();

      useEffect(() => {
            if (currentUser) {
                  form.setValue("firstName", currentUser.firstName);
                  form.setValue("lastName", currentUser.lastName);
                  form.setValue("email", currentUser.email ?? "");
                  form.setValue("phone", currentUser.phone ?? "");
            }
      }, [currentUser]);

      const form = useForm<z.infer<typeof OrderSchema>>({
            resolver: zodResolver(OrderSchema),
            defaultValues: { cartProducts: [], },
      });

      const onSubmit = (values: z.infer<typeof OrderSchema>) => {
            setIsPending(true);

            const dataToSend = {
                  ...values,
                  cartProducts: cartProducts,
            };

            startTransition(() => {
                  registerOrder(dataToSend)
                        .then((data) => {
                              if (data?.error) {
                                    setError(data.error);
                              } else if (data.url) {
                                    window.location = data.url;
                                    clearCart();
                              }
                        })
                        .catch((error) => {
                              setError("Erro ao enviar o formulário.");
                              console.error("Erro ao enviar o formulário:", error);
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

      return (
            <Card style={{ maxWidth: "600px" }}>
                  <Flex className="justify-start space-x-2 items-center">
                        <BsClipboardData size={20} />
                        <Title>Order Information</Title>
                  </Flex>
                  <Divider />
                  <form
                        className={"w-full flex flex-col items-center justify-center space-y-4"}
                        onSubmit={form.handleSubmit(onSubmit)}
                        onChange={cleanMessages}
                  >
                        <div className="w-full space-y-1">
                              <h3 className="text-tremor-label font-bold text-slate-800 ml-1">First Name</h3>
                              <TextInput
                                    className="defaultInput"
                                    type={"text"}
                                    name={"firstName"}
                                    placeholder={"Ex: John"}
                                    value={form.watch("firstName")}
                                    onChange={(e) => form.setValue("firstName", e.target.value)}
                                    error={form.formState.errors.firstName ? true : false}
                                    errorMessage={form.formState.errors.firstName?.message}
                                    disabled={isPending}
                                    autoComplete={"given-name"}
                              />
                        </div>
                        <div className="w-full space-y-1">
                              <h3 className="text-tremor-label font-bold text-slate-800 ml-1">Last Name</h3>
                              <TextInput
                                    className="defaultInput"
                                    type={"text"}
                                    name={"lastName"}
                                    placeholder={"Ex: Doe"}
                                    value={form.watch("lastName")}
                                    onChange={(e) => form.setValue("lastName", e.target.value)}
                                    error={form.formState.errors.lastName ? true : false}
                                    errorMessage={form.formState.errors.lastName?.message}
                                    disabled={isPending}
                                    autoComplete={"family-name"}
                              />
                        </div>
                        <div className="w-full space-y-1">
                              <h3 className="text-tremor-label font-bold text-slate-800 ml-1">Email Address</h3>
                              <TextInput
                                    className="defaultInput"
                                    type={"email"}
                                    name={"email"}
                                    placeholder={"your_email@example.com"}
                                    value={form.watch("email")}
                                    onChange={(e) => form.setValue("email", e.target.value)}
                                    error={form.formState.errors.email ? true : false}
                                    errorMessage={form.formState.errors.email?.message}
                                    disabled={isPending}
                                    autoComplete={"email"}
                              />
                        </div>
                        <div className="w-full space-y-1">
                              <h3 className="text-tremor-label font-bold text-slate-800 ml-1">Phone Number</h3>
                              <PhoneInput
                                    country={'us'}
                                    value={form.watch('phone')}
                                    onChange={(phone) => form.setValue('phone', phone)}
                                    inputStyle={{ width: '100%', }}
                              />
                              {form.formState.errors && (<p className="text-red-400">{form.formState.errors.zip?.message}</p>)}
                        </div>
                        <div className="w-full space-y-1">
                              <h3 className="text-tremor-label font-bold text-slate-800 ml-1">ZIP Code</h3>
                              <TextInput
                                    className="defaultInput"
                                    type={"text"}
                                    name={"zip"}
                                    placeholder={"12345 or 12345-6789"}
                                    onChange={(e) => form.setValue("zip", e.target.value)}
                                    error={form.formState.errors.zip ? true : false}
                                    errorMessage={form.formState.errors.zip?.message}
                                    disabled={isPending}
                                    autoComplete={"postal-code"}
                              />
                        </div>
                        <div className="w-full space-y-1">
                              <h3 className="text-tremor-label font-bold text-slate-800 ml-1">City</h3>
                              <TextInput
                                    className="defaultInput"
                                    type={"text"}
                                    name={"city"}
                                    placeholder={"City"}
                                    onChange={(e) => form.setValue("city", e.target.value)}
                                    error={form.formState.errors.city ? true : false}
                                    errorMessage={form.formState.errors.city?.message}
                                    disabled={isPending}
                                    autoComplete={"address-level2"}
                              />
                        </div>
                        <div className="w-full space-y-1">
                              <h3 className="text-tremor-label font-bold text-slate-800 ml-1">State</h3>
                              <TextInput
                                    className="defaultInput"
                                    type={"text"}
                                    name={"state"}
                                    placeholder={"State"}
                                    onChange={(e) => form.setValue("state", e.target.value)}
                                    error={form.formState.errors.state ? true : false}
                                    errorMessage={form.formState.errors.state?.message}
                                    disabled={isPending}
                                    autoComplete={"address-level1"}
                                    maxLength={2} // Limit to 2 characters for state abbreviation
                              />
                        </div>
                        <div className="w-full space-y-1">
                              <h3 className="text-tremor-label font-bold text-slate-800 ml-1">Street Address</h3>
                              <TextInput
                                    className="defaultInput"
                                    type={"text"}
                                    name={"street"}
                                    placeholder={"Street Address, Apt/Suite"}
                                    onChange={(e) => form.setValue("street", e.target.value)}
                                    error={form.formState.errors.street ? true : false}
                                    errorMessage={form.formState.errors.street?.message}
                                    disabled={isPending}
                                    autoComplete={"street-address"}
                              />
                        </div>
                        {!success && <Divider />}

                        <Flex flexDirection="col" >
                              {isPending && !success ? (
                                    <BeatLoading />
                              ) : error ? (
                                    <Flex className="w-full flex-col space-y-1">
                                          <Callout
                                                className={"w-full"}
                                                title={error ? (`${error}`) : form.formState.errors ? ("Por favor, preencha todos os campos obrigatórios.") : ""}
                                                color={"red"}
                                          />

                                          <Button
                                                className="w-full"
                                                type={"button"}
                                                onClick={() => {
                                                      setError("")
                                                      form.clearErrors();
                                                }}
                                          >
                                                OK
                                          </Button>
                                    </Flex>
                              ) : (
                                    <Button
                                          className={"w-full bg-slate-800 hover:bg-slate-900 border-slate-950 hover:border-slate-900"}
                                          type={"submit"}
                                          disabled={isPending}
                                    >
                                          Proceed to Checkout
                                    </Button>
                              )}
                        </Flex>
                  </form>
            </Card>
      );
};