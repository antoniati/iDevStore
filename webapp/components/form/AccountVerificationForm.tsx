"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { Button, Callout, Flex } from "@tremor/react";
import { newVerification } from "@/actions/create/account-verification";
import { WrapperForm } from "./WrapperForm";
import { BeatLoading } from "../loadings/BeatLoading";

export const AccountVerificationForm = () => {
      const [error, setError] = useState<string | undefined>();
      const [success, setSuccess] = useState<string | undefined>();

      const searchParams = useSearchParams();

      const token = searchParams.get("token");

      const [isPending, startTransition] = useTransition();

      const onSubmit = useCallback(() => {
            if (success || error) return;

            if (!token) {
                  setError("Invalid or non-existent token. Please enter a valid token.");
                  return;
            };

            startTransition(() => {
                  newVerification(token)
                        .then((data) => {
                              setSuccess(data.success)
                              setError(data.error)
                        })
                        .catch(() => {
                              setError("Oops! An internal server error has occurred. Please check the situation and try again")
                        })
            });
      }, [token, success, error]);

      useEffect(() => {
            onSubmit();
      }, [onSubmit]);

      const router = useRouter();

      return (
            <WrapperForm
                  titleForm={success || error ? "" : "Confirming Email..."}
                  descriptionForm=""
            >
                  <Flex>
                        {success || error ? (
                              <Flex flexDirection="col" className="space-y-4">
                                    <Callout
                                          className={"w-full"}
                                          title={"Email confirmed successfully! You can now log in to your account and enjoy an improved manager experience."}
                                          color={"teal"}
                                    />
                                    <Button type="button" onClick={() => router.push("/auth/login")} >
                                          Sign In
                                    </Button>
                              </Flex>
                        ) : isPending && (
                              <BeatLoading />
                        )}
                  </Flex>
            </WrapperForm>
      );
};