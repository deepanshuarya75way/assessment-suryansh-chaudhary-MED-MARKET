import express from 'express';
import {getAllDiscounts,createDiscount,deleteDiscount,checkDiscount} from '../controllers/areaDiscountController.js';
import { protect,adminOnly} from '../middleware/authMiddleware.js';
const router = express.Router();
router.get('/check/:pincode',protect,checkDiscount);
router.get('/',protect,adminOnly,getAllDiscounts);
router.post('/',protect,adminOnly,createDiscount);
router.delete('/:id',protect,adminOnly,deleteDiscount);
export default router;

