

import React from 'react'
const AddressInputs = ({addressProps,setAddressProps}) => {
  const {phone,city,address,postal}=addressProps;
  return (
    <>
              <div className="md:flex gap-x-3 items-center">
            <div className="flex flex-col w-full">
              <label className="mb-2">Phone</label>
              <input
                type="text"
                name="phone"
                value={phone}
                onChange={(e) => setAddressProps("phone",e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full ">
              <label className="mb-2">City</label>
              <input
                type="text"
                name="city"
                value={city}
                onChange={(e) => setAddressProps("city",e.target.value)}
              />
            </div>
          </div>

          <div className="md:flex gap-x-3 items-center">
            <div className="flex flex-col w-full">
              <label className="mb-2">Street Address</label>
              <input
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddressProps("address",e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full ">
              <label className="mb-2">Postal code</label>
              <input
                type="text"
                name="postal"
                value={postal}
                onChange={(e) => setAddressProps("postal",e.target.value)}
              />
            </div>
          </div>
    </>
  )
}

export default AddressInputs