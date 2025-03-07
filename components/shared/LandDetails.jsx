"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const landData = [
  {
    location: "Korenahally",
    land_name: "Chikkanhola",
    survey_number: "60A",
    owner: "Sannakempegowda",
    acres: 5,
  },
  {
    location: "Chalya Baare",
    land_name: "Kane Seelu",
    survey_number: "61",
    owner: "Sanna Ningegowda",
    acres: 3,
  },
  {
    location: "Bidenahally",
    land_name: "Gadde Gudi",
    survey_number: "200",
    owner: "Sanna Ningegowda",
    acres: 4,
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

  const totalAcres = filteredData.reduce((sum, land) => sum + land.acres, 0);

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
