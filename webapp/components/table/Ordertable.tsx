import { Callout, Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";
import { Order } from "@prisma/client";

type OrderTableProps = {
      orders: Order[] | [];
};

export const OrderTable = ({ orders }: OrderTableProps) => {
      return (
            <Card className="p-2">
                  {orders.length > 0 ? (
                        <Table>
                              <TableHead>
                                    <TableRow>
                                          <TableHeaderCell>Order Status</TableHeaderCell>
                                          <TableHeaderCell>Data</TableHeaderCell>
                                          <TableHeaderCell>Sender</TableHeaderCell>
                                          <TableHeaderCell>Product</TableHeaderCell>
                                    </TableRow>
                              </TableHead>
                              <TableBody>
                                    {orders.map((order) => (
                                          <TableRow key={order.id}>
                                                <TableCell>
                                                      <div>
                                                            <b>payment: </b> <span className="text-green-500">aproved</span> <br />
                                                            <b>delivery: </b> <span className="text-green-500">on the way</span> <br />
                                                            <b>Received: </b> <span className="text-orange-300">not yet</span> <br />
                                                      </div>
                                                </TableCell>
                                                <TableCell>

                                                      <b>Date: </b>{new Date(order.createdAt).toLocaleString()} <br />
                                                      <b>Hour: </b>
                                                </TableCell>
                                                <TableCell>
                                                      <b>person: </b>{order.firstName} {order.lastName} <br />
                                                      <b>email: </b>{order.email} <br />
                                                      <b>phone: </b>{order.phone} <br />
                                                      <b>cidade: </b>{order.city}, <b>state: </b>{order.state} <br />
                                                      <b>street: </b>{order.street} <br />
                                                      <b>zip: </b> {order.zip}
                                                </TableCell>
                                                <TableCell>
                                                      {Array.isArray(order.line_items) ? (
                                                            order.line_items.map((lineItem: any, index: number) => {
                                                                  const productName = lineItem?.price_data?.product_data?.name ?? 'Unknown';
                                                                  const quantity = lineItem?.quantity ?? 0;

                                                                  return (
                                                                        <div key={index}>
                                                                              <b>name: </b> {productName} <br />
                                                                              <b>Quantity: </b> {quantity} <br />
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
                  ) : (
                        <div>
                              <Callout title=" You do not currently have any orders. Go shopping and enjoy our incredible products" />
                        </div>
                  )}
            </Card>
      );
};