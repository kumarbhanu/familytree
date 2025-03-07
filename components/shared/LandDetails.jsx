"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const landData = [
  {
    location: "Chalya baare",
    land_name: "gadde",
    survey_number: "216/p2",
    owner: "Karikempegowda",
    acres: "1.31",
    id: 1,
  },
  {
    location: "Chalya baare",
    land_name: "Chalya baare",
    survey_number: "214/1",
    owner: "sannaningegowda",
    acres: "1.00",
    id: 2,
  },
  {
    id: 3,
    location: "Chalya baare",
    land_name: "Chalya baare",
    survey_number: "214/2",
    owner: "gundegowda",
    acres: "1.10",
  },
  {
    id: 4,
    location: "Chalya baare",
    land_name: "Chalya baare",
    survey_number: "214/3",
    owner: "sannaningegowda",
    acres: "1.01",
  },
  {
    id: 5,
    location: "korenahally",
    land_name: "kane seelu",
    survey_number: "61/8",
    owner: "rangegowda",
    acres: "0.06",
  },
  {
    id: 6,
    location: "korenahally",
    land_name: "mallammana thota",
    survey_number: "56/1",
    owner: "sannaningegowda",
    acres: "0.21",
  },
  {
    id: 7,
    location: "korenahally",
    land_name: "dodda thota",
    survey_number: "57/1",
    owner: "sannaningegowda",
    acres: "0.08",
  },
  {
    id: 8,
    location: "korenahally",
    land_name: "chikkanna hola",
    survey_number: "60/1A",
    owner: "-",
    acres: "0.34",
  },
  {
    id: 10,
    location: "bindenahally",
    land_name: "gudi gadde",
    survey_number: "67",
    owner: "sannakempegowda",
    acres: "0.20",
  },
  {
    id: 11,
    location: "bindenahally",
    land_name: " gadde",
    survey_number: "92",
    owner: "sannakempegowda",
    acres: "0.26",
  },
];

export default function LandList() {
  const [search, setSearch] = useState({
    location: "",
    land_name: "",
    survey_number: "",
    owner: "",
  });

  const filteredData = landData.filter(
    (land) =>
      land.location.toLowerCase().includes(search.location.toLowerCase()) &&
      land.land_name.toLowerCase().includes(search.land_name.toLowerCase()) &&
      land.survey_number.toLowerCase().includes(search.survey_number.toLowerCase()) &&
      land.owner.toLowerCase().includes(search.owner.toLowerCase())
  );

  // Fixing total acres calculation
  const totalAcres = filteredData.reduce((sum, land) => sum + (parseFloat(land.acres) || 0), 0).toFixed(2);

  return (
    <div className="container mx-auto p-4">
      {/* Search Section */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Input
          placeholder="Search by Location"
          className="w-full md:w-1/4"
          onChange={(e) => setSearch({ ...search, location: e.target.value })}
        />
        <Input
          placeholder="Search by Land Name"
          className="w-full md:w-1/4"
          onChange={(e) => setSearch({ ...search, land_name: e.target.value })}
        />
        <Input
          placeholder="Search by Survey Number"
          className="w-full md:w-1/4"
          onChange={(e) => setSearch({ ...search, survey_number: e.target.value })}
        />
        <Input
          placeholder="Search by Owner"
          className="w-full md:w-1/4"
          onChange={(e) => setSearch({ ...search, owner: e.target.value })}
        />
      </div>

      {/* Total Acres */}
      <h2 className="text-xl font-bold mb-4">Total Acres: {totalAcres}</h2>

      {/* Land Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.map((land, index) => {
          const isRegistered =
            ["Sannakempegowda", "Rangegowda", "Karikempegowda"].includes(land.owner);
          return (
            <Card key={index} className="shadow-lg">
              <CardHeader>
                <CardTitle>{land.land_name}</CardTitle>
                <Badge variant={isRegistered ? "default" : "destructive"}>
                  {isRegistered ? "Registered" : "Pending"}
                </Badge>
              </CardHeader>
              <CardContent>
                <p><strong>Location:</strong> {land.location}</p>
                <p><strong>Survey No:</strong> {land.survey_number}</p>
                <p><strong>Owner:</strong> {land.owner}</p>
                <p><strong>Acres:</strong> {land.acres}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
