import Orders from "../models/orders";

export const createOrder = async (
  email: string,
  orderData: any,
  address: any,
  totalPrice: Number
) => {
  const existingOrder = await Orders.findOne({ email });

  if (!existingOrder) {
    await Orders.create({
      email,
      orderData: [
        {
          orderDate: new Date(),
          orderItems: orderData,
          price: totalPrice,
          address,
        },
      ],
    });
  } else {
    await Orders.findOneAndUpdate(
      { email },
      {
        $push: {
          orderData: {
            orderDate: new Date(),
            orderItems: orderData,
            price: totalPrice,
            address,
          },
        },
      }
    );
  }
};

export const getOrderData = async (email: string) => {
  return await Orders.findOne({ email });
};
