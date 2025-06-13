export interface Car {
  id: number;
  supplier_id: number;
  category_id: number;
  brand_id: number;
  branch_id: number;
  model: string;
  year: number;
  user_id: null;
  is_sold: number;
  is_booked: number;
  price: number;
  doors: number;
  acceleration: number;
  top_speed: number;
  fuel_efficiency: number;
  color: string;
  engine_type: string;
  engine_power: number;
  engine_cylinder: number;
  engine_cubic_capacity_type: number;
  transmission: string;
  features: string;
  performance: string;
  safety: string;
  is_available: number;
  main_image: string;
  deposit_amount: number;
  images: string[];
  booking_user: {
    address: string;
    email: string;
    id: number;
    name: string;
    phone_no: string;
  } | null;
}
