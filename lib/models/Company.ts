import mongoose from "mongoose"; 
import { Schema, models, model } from "mongoose";

const CompanySchema = new Schema({
  name: { type: String, required: true },
  name_en: { type: String },
  established: { type: String },
  representative: { type: String },
  capital: { type: String },
  employees: { type: String },
  business: { type: String },
  business_en: { type: String },
  address: { type: String },
  phone: { type: String },
  email: { type: String },
  hours: { type: String },
  access: { type: String },
  map_image_url: { type: String },
}, { timestamps: true });

const Company = models.Company || model("Company", CompanySchema);
export default /** @type {import("mongoose").Model<import("mongoose").Document>}*/ (Company)
