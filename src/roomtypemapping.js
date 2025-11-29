// roomtypemapping.js
// Map roomtypeid to room type details

export const roomTypeMapping = {
  1: {
    roomtypename: "Single Room",
    size_sqm: 20,
    size_sqft: 215,
    capacity: 1,
    base_price: 50.0,
  },
  2: {
    roomtypename: "Double Room",
    size_sqm: 30,
    size_sqft: 323,
    capacity: 2,
    base_price: 80.0,
  },
  3: {
    roomtypename: "Deluxe Room",
    size_sqm: 40,
    size_sqft: 430,
    capacity: 2,
    base_price: 120.0,
  },
  4: {
    roomtypename: "Family Suite",
    size_sqm: 60,
    size_sqft: 645,
    capacity: 4,
    base_price: 200.0,
  },
  5: {
    roomtypename: "Presidential Suite",
    size_sqm: 100,
    size_sqft: 1076,
    capacity: 6,
    base_price: 500.0,
  },
};

export default roomTypeMapping;
