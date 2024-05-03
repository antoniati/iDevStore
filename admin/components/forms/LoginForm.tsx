import Link from "next/link";
import { Button, Divider, Flex, Text, TextInput } from "@tremor/react"
import { WrapperForm } from "@/components/forms/WrapperForm"

export const UserLoginForm = () => {
      return (
            <WrapperForm
                  titleForm={"Welcome Back"}
                  descriptionForm={"Sign in to your account and enjoy an improved management experience."}
            >
                  <form className={"w-full space-y-4"} >
                        <Flex className={"flex-col space-y-4 items-start"}>
                              <TextInput
                                    type={"email"}
                                    name={"email"}
                                    placeholder={"E-mail"}
                                    errorMessage={"Este campo é obrigatório"}
                                    autoComplete={"off"}
                              />
                              <TextInput
                                    type={"password"}
                                    name={"password"}
                                    placeholder={"Senha"}
                                    errorMessage={"Insira no mínimo 6 caracteres para senha."}
                                    autoComplete={"off"}
                              />
                        </Flex>
                        <Divider />
                        <Button type={"submit"} className="w-full ">
                              Sign in
                        </Button>
                  </form>

                  <div className="text-center flex flex-col sm:flex-row p-4" style={{ gap: '5px' }}>
                        <Text>Don't have an account?</Text>
                        <Link href={"/auth/register"} className='text-tremor-default text-blue-600 underline'>
                              Register Now
                        </Link>
                  </div>
            </WrapperForm>
      );
};