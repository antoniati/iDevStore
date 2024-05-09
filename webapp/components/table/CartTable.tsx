import { BsCart, BsFileMinus, BsFilePlus } from "react-icons/bs";
import { Button, Card, Divider, Flex, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Title } from "@tremor/react";
import { Product } from "@prisma/client";

interface CartTableProps {
      products: Product[];
      cartProducts: string[];
      addProduct: (productId: string) => void;
      removeProduct: (productId: string) => void;
}

const formatValueToUSD = (value: number) => {
      return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
      }).format(value);
};

const formatPrice = (priceStr: string) => {
      // Remove símbolos não numéricos, incluindo pontos, exceto a última ocorrência de ponto ou vírgula
      let cleanPrice = priceStr.replace(/[^0-9,.]/g, '');

      // Substitui todas as vírgulas por pontos e retorna como número
      return parseFloat(cleanPrice.replace(/,/g, ''));
};

export const CartTable = ({ products, cartProducts, addProduct, removeProduct }: CartTableProps) => {
      const moreThisProduct = (id: string) => addProduct(id);
      const lessThisProduct = (id: string) => removeProduct(id);

      const cartProductList = products.filter((product) => cartProducts.includes(product.id));

      let total = 0;

      cartProductList.forEach((product) => {
            const price = formatPrice(product.price);
            const quantity = cartProducts.filter((id) => id === product.id).length;

            total += price * quantity;
      });

      return (
            <Card>
                  <Flex className="justify-start space-x-2 items-center">
                        <BsCart size={20} />
                        <Title>Shopping Cart</Title>
                  </Flex>
                  <Divider />
                  {cartProductList.length > 0 && (
                        <>
                              <Flex className="flex-col overflow-auto pb-2 space-y-4 items-start">
                                    <Table className="w-full">
                                          <TableHead>
                                                <TableRow className="bg-gray-50">
                                                      <TableHeaderCell>Product</TableHeaderCell>
                                                      <TableHeaderCell>Quantity</TableHeaderCell>
                                                      <TableHeaderCell>Price</TableHeaderCell>
                                                </TableRow>
                                          </TableHead>
                                          <TableBody>
                                                {cartProductList.map((product) => {
                                                      const price = formatPrice(product.price);
                                                      const quantity = cartProducts.filter((id: string) => id === product.id).length;

                                                      return (
                                                            <TableRow key={product.id} className="text-slate-800">
                                                                  <TableCell>
                                                                        <Flex className="justify-start space-x-4">
                                                                              <div style={{ width: "60px" }}>
                                                                                    <img
                                                                                          src={product.images[0]}
                                                                                          alt={`Image of ${product.name}`}
                                                                                          className="border-2 border-slate-200 hover:border-blue-500 transition-all duration-300 rounded-tremor-default"
                                                                                          style={{ objectFit: "cover" }}
                                                                                    />
                                                                              </div>
                                                                              <p className="font-medium">{product.name}</p>
                                                                        </Flex>
                                                                  </TableCell>
                                                                  <TableCell>
                                                                        <Flex className="justify-start space-x-1">
                                                                              <Button
                                                                                    icon={BsFileMinus}
                                                                                    type="button"
                                                                                    variant="light"
                                                                                    onClick={() => lessThisProduct(product.id)}
                                                                              />
                                                                              <p className="font-bold">{quantity}</p>
                                                                              <Button
                                                                                    icon={BsFilePlus}
                                                                                    type="button"
                                                                                    variant="light"
                                                                                    onClick={() => moreThisProduct(product.id)}
                                                                              />
                                                                        </Flex>
                                                                  </TableCell>
                                                                  <TableCell>
                                                                        <p className="font-medium text-tremor-title">
                                                                              {formatValueToUSD(quantity * price)}
                                                                        </p>
                                                                  </TableCell>
                                                            </TableRow>
                                                      );
                                                })}
                                          </TableBody>
                                    </Table>
                              </Flex>
                              <Divider />
                              <Flex className="justify-start">
                                    <TableCell>
                                          <Title className="font-bold">Total</Title>
                                    </TableCell>
                                    <TableCell>
                                          <Title className="font-bold">{formatValueToUSD(total)}</Title>
                                    </TableCell>
                              </Flex>
                        </>
                  )}
            </Card>
      );
};