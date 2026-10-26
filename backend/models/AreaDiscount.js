import mongoose from 'mongoose';
const areaDiscountSchema=new mongoose.Schema({
  pincode:{ type:String, required:true,match: /^\d{6}$/},
  areaName:{type:String,default: ''},
  percent:{type:Number,required:true,min:1,max:50},
  minOrderAmount:{type:Number,default:0,min:0},
  maxDiscount:{type:Number,default:0,min:0},
  isActive:{type:Boolean,default:true}
},{timestamps:true});
export default mongoose.model('AreaDiscount', areaDiscountSchema);