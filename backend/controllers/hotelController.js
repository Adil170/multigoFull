const  Hotel  = require('../models/hotel');

// Add a new hotel with its items
exports.addHotel = async (req, res) => {
    
  try {
    const hotel = await Hotel.create(req.body);
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  };

// get all hotels data

exports.getHotel = async (req, res) => {
    
  try {
    const hotel = await Hotel.find({});
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  };

// get all items 

exports.getItems = async (req, res) => {
    
  try {
    const allMenuItems = await Hotel.aggregate([
      { $unwind: '$items' },
      {
        $project: {
          _id: 0,
          hotelId: '$_id',
          itemName: '$items.name',
          image: '$items.image',
          sizes: '$items.sizes',
          desc: '$items.desc',
        },
      },
    ]);
    res.json(allMenuItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  };
  

  //post MenuItems using Hotel Id 
exports.addMenuItems = async (req, res) => {
    
  try {
    const hotelId = req.params.hotelId;
    const newItem = req.body;

    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    hotel.items.push(newItem);
    await hotel.save();

    res.json(hotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

//updata hotel Using hotel ID
exports.updateHotel = async(req,res ) => {
  try {
    const hotelId = req.params.hotelId;
    const updatedHotelData = req.body;

    const updatedHotel = await Hotel.findByIdAndUpdate(
      hotelId,
      updatedHotelData,
      { new: true } // Return the updated document
    );

    if (!updatedHotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    res.json(updatedHotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
// Update a menu item within a hotel


exports.updateMenuItems = async(req,res ) => {
  try {
    const hotelId = req.params.hotelId;
    const itemId = req.params.itemId;
    const updatedItemData = req.body;

    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    const itemToUpdate = hotel.items.find(item => item._id.toString() === itemId);

    if (!itemToUpdate) {
      return res.status(404).json({ message: 'Item not found in the hotel' });
    }

    Object.assign(itemToUpdate, updatedItemData); // Update the item's data

    await hotel.save();

    res.json(hotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
exports.deleteHotel = async(req,res ) => {
  try {
    const hotelId = req.params.hotelId;
    const deletedHotel = await Hotel.findByIdAndDelete(hotelId);

    if (!deletedHotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json({ message: 'Hotel deleted successfully' });

    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
 
  
  
