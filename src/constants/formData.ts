import { USERS } from "./users";
import { VEHICLES } from "./vehicles";

export function getFormData(
  selectedUserIdx: number,
  selectedVehicleIdx: number
) {
  const user = USERS[selectedUserIdx];
  const vehicle = VEHICLES[selectedVehicleIdx];
  return {
    date: "13   07   2025",
    duration: "1",
    hours: "8",
    city: "الرياض",
    name: user.name,
    birthDay: user.birthDay,
    nationalId: user.nationalId,
    department: user.department,
    benifAdministration: user.benifAdministration,
    AdministrationDirector: user.AdministrationDirector,
    userPhone: user.userPhone,
    vehiclePlateNumber: vehicle.vehiclePlateNumber,
    vehicleType: vehicle.vehicleType,
    vehicleBrand: vehicle.vehicleBrand,
    vehicleModel: vehicle.vehicleModel,
    vehicleColor: vehicle.vehicleColor,
    chassisNumber: vehicle.chassisNumber,
    km: vehicle.km,
    check: "✓",
    reason: "طلب اجازة",
  };
}

export const checkMarkCoordinates = [
  { x: 166, y: 483 },
  { x: 166, y: 471 },
  { x: 166, y: 460 },
  { x: 166, y: 450 },
  { x: 95, y: 483 },
  { x: 95, y: 471 },
  { x: 95, y: 460 },
];
