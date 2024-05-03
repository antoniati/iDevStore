import Link from "next/link";
import { Button, Divider, Flex, Text, TextInput } from "@tremor/react"
import { WrapperForm } from "@/components/forms/WrapperForm"

export const UserRegisterForm = () => {
      return (
            <WrapperForm
                  titleForm={"Create an account"}
                  descriptionForm={"Fill out the form below to create an account"}
            >
                  <form className={"w-full space-y-4"} >
                        <Flex className={"flex-col space-y-4 items-start"}>
                              <TextInput
                                    type={"text"}
                                    name={"firstName"}
                                    placeholder={"Nome"}
                                    errorMessage={"Este campo é obrigatório"}
                                    autoComplete={"off"}
                              />
                              <TextInput
                                    type={"text"}
                                    name={"lastName"}
                                    placeholder={"Sobrenome"}
                                    errorMessage={"Este campo é obrigatório"}
                                    autoComplete={"off"}
                              />
                              <TextInput
                                    type={"email"}
                                    name={"email"}
                                    placeholder={"E-mail"}
                                    errorMessage={"Este campo é obrigatório"}
                                    autoComplete={"off"}
                              />
                              <TextInput
                                    type={"text"}
                                    name={"phone"}
                                    placeholder={"Telefone"}
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

                        <Flex className={"flex-col space-y-4"}>
                              <h3 className={"text-xs text-slate-400"}>
                                    By clicking Register, you agree to our <b>Terms</b>,
                                    <b>Privacy Policy</b> and <b>Cookie Policy</b>.
                              </h3>

                              <Button
                                    className={"w-full bg-slate-800 hover:bg-slate-900 border-slate-950 hover:border-slate-900"}
                                    type={"submit"}
                              >
                                    Register
                              </Button>
                        </Flex>
                  </form>

                  <div className="text-center flex flex-col sm:flex-row p-4" style={{ gap: '5px' }}>
                        <Text> Already have an account?&nbsp;</Text>
                        <Link href={"/auth/login"} className='text-tremor-default text-blue-600 underline'>
                              Sign In Now
                        </Link>
                  </div>
            </WrapperForm>
      );
};