"use client";
import { Button, Divider, Flex } from "@tremor/react";
import { BsFacebook, BsInstagram, BsTwitterX } from "react-icons/bs";

export const MainFooter = () => {
      return (
            <>
                  <Divider />
                  <footer className="footer">
                        <div className="footer-content">
                              <div className="footer-row">
                                    <div className="footer-col">
                                          <h4>Store</h4>
                                          <ul>
                                                <li><Button variant="light">Cart</Button></li>
                                                <li><Button variant="light">Search</Button></li>
                                                <li><Button variant="light">Products</Button></li>
                                                <li><Button variant="light">Orders</Button></li>
                                                <li><Button variant="light">Categories</Button></li>
                                          </ul>
                                    </div>
                                    <div className="footer-col">
                                          <h4>Support</h4>
                                          <ul>
                                                <li><Button variant="light">FAQ</Button></li>
                                                <li><Button variant="light">Shipping</Button></li>
                                                <li><Button variant="light">Order Status</Button></li>
                                                <li><Button variant="light">Payment Options</Button></li>
                                          </ul>
                                    </div>
                                    <div className="footer-col">
                                          <h4>Follow us</h4>
                                          <div className="socialLinks">
                                                <Button icon={BsInstagram} variant="secondary" className="rounded-tremor-full" />
                                                <Button icon={BsFacebook} variant="secondary" className="rounded-tremor-full" />
                                                <Button icon={BsTwitterX} variant="secondary" className="rounded-tremor-full" />
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </footer>
                  <Divider />
                  <div className="main-container">
                        <Flex className="px-4 flex-col sm:flex-row" style={{ paddingBottom: "20px", gap: '20px' }}>
                              <h4 className="text-tremor-label">&#169; 2024 - iDevStore, All Rights Reserved. | Developed in Brazil</h4>
                              <h4 className="text-tremor-label font-medium">
                                    Made by: Antoniati
                              </h4>
                        </Flex>
                  </div>
            </>
      );
};