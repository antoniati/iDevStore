import { Flex, Subtitle, Text, } from "@tremor/react";
import { AnimBottomToTop, Doubts } from "@/components";
import { WrapperFormProps } from "@/types";

export const WrapperForm = ({ titleForm, descriptionForm, children }: WrapperFormProps) => {
      return (
            <Flex className="wrapperForm">
                  <AnimBottomToTop>
                        <div className="p-2 text-center max-w-lg flex flex-col items-center justify-center space-y-4">
                              <Subtitle className='font-bold text-slate-900' style={{ textTransform: 'uppercase' }}>
                                    {titleForm}
                              </Subtitle>
                              <Text> {descriptionForm} </Text>
                              {children}
                        </div>
                  </AnimBottomToTop>
                  <Doubts />
            </Flex>
      );
};