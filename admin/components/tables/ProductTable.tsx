"use client";

import { useRouter } from "next/navigation";
import { BsPencilSquare, BsTrashFill } from "react-icons/bs";
import { Button, Card, Flex, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";
import { Product } from "@prisma/client";

type ProductTableProps = {
      products: Product[];
};

export const ProductTable = ({ products }: ProductTableProps) => {
      const router = useRouter();

      return (
            <Card className="p-2">
                  <Table>
                        <TableHead>
                              <TableRow>
                                    <TableHeaderCell>Product Name</TableHeaderCell>
                                    <TableHeaderCell>Category</TableHeaderCell>
                                    <TableHeaderCell>Sales Value</TableHeaderCell>
                                    <TableHeaderCell></TableHeaderCell>
                              </TableRow>
                        </TableHead>
                        <TableBody>
                              {products.map(product => {
                                    return (
                                          <TableRow key={product.id}>
                                                <TableCell>{product.name}</TableCell>
                                                <TableCell>{product.categoryName}</TableCell>
                                                <TableCell>{product.price}</TableCell>
                                                <TableCell>
                                                      <Flex className="justify-start space-x-2">
                                                            <Button
                                                                  icon={BsPencilSquare}
                                                                  size={"md"}
                                                                  className="transition-all duration-300"
                                                                  onClick={() => router.push(`/products/edit/${product.id}`)}
                                                            >
                                                                  Edit Product
                                                            </Button>
                                                            <Button
                                                                  icon={BsTrashFill}
                                                                  size={"md"}
                                                                  className="text-white bg-rose-400 hover:bg-rose-500 border-rose-500 transition-all duration-300 hover:border-rose-500"
                                                                  onClick={() => router.push(`/products/delete/${product.id}`)}
                                                            >
                                                                  Delete
                                                            </Button>
                                                      </Flex>
                                                </TableCell>
                                          </TableRow>
                                    )
                              })}
                        </TableBody>
                  </Table>
            </Card>
      );
};