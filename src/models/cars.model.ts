import { Model, ModelObject } from "objection";

export class CarsModel extends Model {
  id!: string;
  merk!: string;
  type!: string;
  year!: number;
  status!: "available" | "rented";
  created_by!: string;
  updated_by!: string;
  deleted_by?: string;
  created_at!: Date;
  updated_at!: Date;
  deleted_at?: Date;
  static get tableName() {
    return "cars";
  }
}

export type Cars = ModelObject<CarsModel>;
