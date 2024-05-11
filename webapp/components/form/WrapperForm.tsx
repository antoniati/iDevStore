import { Flex, Subtitle, Text, } from "@tremor/react";
import { Doubts } from "../footers/Doubts";

interface WrapperFormProps {
      titleForm: string;
      descriptionForm: string;
      children: React.ReactNode;
};

export const WrapperForm = ({ titleForm, descriptionForm, children }: WrapperFormProps) => {
      return (
            <Flex className="wrapper-form">
                  <div className="p-2 text-center max-w-lg flex flex-col items-center justify-center space-y-4">
                        <Subtitle className='font-bold text-slate-900' style={{ textTransform: 'uppercase' }}>
                              {titleForm}
                        </Subtitle>
                        <Text> {descriptionForm} </Text>
                        {children}
                  </div>
                  <Doubts />
            </Flex>
      );
};