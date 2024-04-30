import User from "../models/user";

export const createAddress = async (email: string, address: any) => {
  await User.findOneAndUpdate(
    { email },
    {
      $push: {
        addressData: address,
      },
    }
  );
};

export const getAddressData = async (email: string) => {
  return await User.findOne({ email });
};

export const updateAddress = async (
  email: string,
  id: string,
  addressData: object
) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const addressIndex = user.addressData.findIndex((item) => item.id === id);

  if (addressIndex !== -1) {
    user.addressData[addressIndex] = addressData;
    await user.save();
  }
};

export const deleteAddress = async (email: string, addressId: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const addressIndex = user.addressData.findIndex(
    (item) => item.id === addressId
  );

  if (addressIndex !== -1) {
    user.addressData.splice(addressIndex, 1);
    await user.save();
  }
};
