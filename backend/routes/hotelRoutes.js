// routes/hotelRoutes.js
const express = require('express');
const router = express.Router();
const hotelController = require("../controllers/hotelController")

// POST a new restaurant
router.post('/add-hotel',hotelController.addHotel) 

// get all hotels data 

router.get('/get-hotels',hotelController.getHotel) 

// get all items 

router.get('/get-items',hotelController.getItems) 

//post Items Using Hotel Id 

router.post('/:hotelId/menuItems',hotelController.addMenuItems)

//updata hotel Using hotel ID

router.put('/:hotelId',hotelController.updateHotel)

//update item Using hotel Id and Item Id 

router.put('/:hotelId/items/:itemId',hotelController.updateMenuItems)

//Delete Hotel using Id 


router.delete('/:hotelId',hotelController.deleteHotel)






module.exports = router;

