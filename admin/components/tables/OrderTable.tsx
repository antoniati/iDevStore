import { Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";
import { Order } from "@prisma/client";

type OrderTableProps = {
      orders: Order[];
};

export const OrderTable = ({ orders }: OrderTableProps) => {
      return (
            <Card className="p-2">
                  <Table>
                        <TableHead>
                              <TableRow>
                                    <TableHeaderCell>Data</TableHeaderCell>
                                    <TableHeaderCell>Sender</TableHeaderCell>
                                    <TableHeaderCell>Product</TableHeaderCell>
                              </TableRow>
                        </TableHead>
                        <TableBody>
                              {orders.map((order) => (
                                    <TableRow key={order.id}>
                                          <TableCell>
                                                {new Date(order.createdAt).toLocaleString()}
                                          </TableCell>
                                          <TableCell>
                                                <b>person: </b>{order.firstName} {order.lastName}
                                                <br />
                                                <b>email: </b>{order.email}
                                                <br />
                                                <b>phone: </b>{order.phone}
                                                <br />
                                                <b>cidade: </b>{order.city}, <b>state: {order.state} </b>
                                                <br />
                                                <b>street: </b>{order.street}
                                                <br />
                                                <b>zip: </b> {order.zip}
                                          </TableCell>
                                          <TableCell>
                                                {Array.isArray(order.line_items) ? (
                                                      order.line_items.map((lineItem: any, index: number) => {
                                                            const productName = lineItem?.price_data?.product_data?.name ?? 'Unknown';
                                                            const quantity = lineItem?.quantity ?? 0;

                                                            return (
                                                                  <div key={index}>
                                                                        {productName}
                                                                        <br />
                                                                        Quantity: {quantity}
                                                                        <br />
                                                                  </div>
                                                            );
                                                      })
                                                ) : (
                                                      <div>No Items</div>
                                                )}
                                          </TableCell>
                                    </TableRow>
                              ))}
                        </TableBody>
                  </Table>
            </Card>
      );
};