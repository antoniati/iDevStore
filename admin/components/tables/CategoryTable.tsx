"use client";

import { useRouter } from "next/navigation";
import { BsPencilSquare, BsTrashFill } from "react-icons/bs";
import { Button, Card, Flex, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";

type CategoryTableProps = {
      categories: { id: string, name: string, parent: string | null }[];
};

export const CategoryTable = ({ categories }: CategoryTableProps) => {
      const router = useRouter();

      return (
            <Card className="p-2">
                  <Table>
                        <TableHead>
                              <TableRow>
                                    <TableHeaderCell>Category Name</TableHeaderCell>
                                    <TableHeaderCell>SubCategory</TableHeaderCell>
                                    <TableHeaderCell>Actions</TableHeaderCell>
                              </TableRow>
                        </TableHead>

                        <TableBody>
                              {categories.map(category => {
                                    return (
                                          <TableRow key={category.id}>
                                                <TableCell>{category.name}</TableCell>
                                                <TableCell>{category.parent}</TableCell>
                                                <TableCell>
                                                      <Flex className="justify-start space-x-2">
                                                            <Button
                                                                  icon={BsPencilSquare}
                                                                  size={"md"}
                                                                  className="transition-all duration-300"
                                                                  onClick={() => router.push(`/category/edit/${category.id}`)}
                                                            >
                                                                  Edit Category
                                                            </Button>
                                                            <Button
                                                                  icon={BsTrashFill}
                                                                  size={"md"}
                                                                  className="text-white bg-rose-400 hover:bg-rose-500 border-rose-500 transition-all duration-300 hover:border-rose-500"
                                                                  onClick={() => router.push(`/category/delete/${category.id}`)}
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