import React from "react";
import { getAllDates } from "@/utils/GetAlldate";

export default function page() {

 return <h1 className="text-[20px]">{getAllDates()}</h1>;
}
