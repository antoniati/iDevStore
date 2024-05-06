"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsExclamationTriangleFill } from "react-icons/bs";
import { Button, Callout, Flex, Title } from "@tremor/react";
import { AnimBottomToTop, BeatLoading } from "@/components";

interface DeleteSectionProps {
      name: string;
      urlBackPage: string;
      idToDeleteData: string;
      deleteFunction: (id: string) => Promise<{ success: string, error: string }>;
};

export const DeleteSection = ({ deleteFunction, idToDeleteData, urlBackPage, name }: DeleteSectionProps) => {
      const [success, setSuccess] = useState<string>("");
      const [error, setError] = useState<string>("");
      const [isPending, setIsPending] = useState<boolean>(false);

      const router = useRouter();

      const handleGoBackPage = () => {
            router.push(urlBackPage);
      };

      const handleDeleteData = async () => {
            setIsPending(true);
            setError("");
            setSuccess("");

            try {
                  const result = await deleteFunction(idToDeleteData);

                  if (result.success) {
                        setSuccess(result.success);
                  } else if (result.error) {
                        setError(result.error);
                  }
            } catch (error) {
                  setError(`An error occurred while trying to delete data. Please try again later.`);
            } finally {
                  setIsPending(false);
            };
      };

      return (
            <AnimBottomToTop>
                  <div className="w-full space-y-4 ">
                        <Title>
                              <Flex className="justify-start space-x-2 py-2">
                                    <BsExclamationTriangleFill className="text-rose-500" size={26} />
                                    <span>Attention!</span>
                              </Flex>
                        </Title>

                        {success ? (
                              <Flex className="w-full flex-col space-y-4 items-start">
                                    <Callout
                                          title={success}
                                          color="teal"
                                          className="w-full"
                                    />
                                    <Button
                                          type="button"
                                          onClick={handleGoBackPage}
                                    >
                                          OK
                                    </Button>
                              </Flex>
                        ) : error ? (
                              <Flex className="w-full flex-col space-y-4 items-start">
                                    <Callout
                                          title={error}
                                          color="rose-500"
                                          className="w-full"
                                    />
                                    <Button
                                          variant="secondary"
                                          onClick={handleGoBackPage}>
                                          Back
                                    </Button>
                              </Flex>
                        ) : (
                              <>
                                    <Callout title="Are you sure you want to delete?" color="rose-500">
                                          By clicking "Yes, Delete", all data of {name} will be irreversibly deleted.
                                          Please be sure before proceeding.
                                    </Callout>

                                    {isPending ? (
                                          <BeatLoading />
                                    ) : (
                                          <Flex className="justify-start space-x-2">
                                                <Button
                                                      type="button"
                                                      className="bg-rose-500 hover:bg-rose-600 border-none"
                                                      onClick={handleDeleteData}
                                                >
                                                      Yes, Delete
                                                </Button>
                                                <Button
                                                      type="button"
                                                      variant="secondary"
                                                      onClick={handleGoBackPage}
                                                >
                                                      Cancel
                                                </Button>
                                          </Flex>
                                    )}
                              </>
                        )}
                  </div>
            </AnimBottomToTop>
      );
}