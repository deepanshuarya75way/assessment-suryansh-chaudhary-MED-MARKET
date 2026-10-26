import AreaDiscount from '../models/AreaDiscount.js';
export const getPincode=(address)=>{
  const m=(address || '').match(/\b\d{6}\b/g);
  return m?m[m.length-1]: null;
};
export const calculateAreaDiscount=async(address,itemTotal)=>{
  const pincode = getPincode(address);
  if(!pincode) return 0;
  const rule = await AreaDiscount.findOne({pincode,isActive:true})
  if(!rule) return 0;
  return Math.round((itemTotal*rule.percent)/100);
};
export const getAllDiscounts=async (req,res) =>{
  const list=await AreaDiscount.find().sort({createdAt:-1});
  res.json(list);
};
export const createDiscount=async (req,res) =>{
  const {pincode,areaName,percent}= req.body;
  if(!/^\d{6}$/.test(pincode || '')) return res.status(400).json({message:'pincode is of 6 digits.'});
  if(!(percent>= 1 && percent <=50)) return res.status(400).json({message:'Discount must be b/w 1 and 50'});
  if(await AreaDiscount.findOne({pincode})) return res.status(400).json({message:'This pincode already had discount.'});

  const rule = await AreaDiscount.create({pincode,areaName,percent});
  res.status(201).json(rule);
};
export const deleteDiscount=async(req,res) =>{
  await AreaDiscount.findByIdAndDelete(req.params.id);
  res.json({message:'Deleted'});

}

export const checkDiscount=async(req,res)=>{
  const amount=Number(req.query.amount) || 0;
  const discountAmount=await calculateAreaDiscount(`-${req.params.pincode}`,amount);
  res.json({discountAmount});
};