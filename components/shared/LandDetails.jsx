"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const landData = [
  { location: "Chalya baare", land_name: "gadde", survey_number: "216/p2", owner: "Karikempegowda", acres: "1.31", id: 1, status: "Registered" },
  { location: "Chalya baare", land_name: "Chalya baare", survey_number: "214/1", owner: "sannaningegowda", acres: "1.00", id: 2, status: "Pending" },
  { id: 3, location: "Chalya baare", land_name: "Chalya baare", survey_number: "214/2", owner: "gundegowda", acres: "1.10", status: "Pending" },
  { id: 4, location: "Chalya baare", land_name: "Chalya baare", survey_number: "214/3", owner: "sannaningegowda", acres: "1.01", status: "Pending" },
  { id: 5, location: "korenahally", land_name: "kane seelu", survey_number: "61/8", owner: "Rangegowda", acres: "0.06", status: "Registered" },
  { id: 6, location: "korenahally", land_name: "mallammana thota", survey_number: "56/1", owner: "sannaningegowda", acres: "0.21", status: "Pending" },
  { id: 7, location: "korenahally", land_name: "dodda thota", survey_number: "57/1", owner: "sannaningegowda", acres: "0.08", status: "Pending" },
  { id: 8, location: "korenahally", land_name: "chikkanna hola", survey_number: "60/1A", owner: "-", acres: "0.34", status: "Pending" },
  { id: 10, location: "bindenahally", land_name: "gudi gadde", survey_number: "67", owner: "Sannakempegowda", acres: "0.20", status: "Registered" },
  { id: 11, location: "bindenahally", land_name: "gadde", survey_number: "92", owner: "Sannakempegowda", acres: "0.26", status: "Registered" },
  { id: 12, location: "korenahally", land_name: "chikkanna hola", survey_number: "60/1B", owner: "-", acres: "0.13", status: "Registered" },
];

// Extract unique dropdown options
const getUniqueValues = (key) => [...new Set(landData.map((item) => item[key]))];

export default function LandList() {
  const [search, setSearch] = useState({
    location: "",
    land_name: "",
    survey_number: "",
    owner: "",
    status: "",
  });

  const filteredData = landData.filter(
    (land) =>
      (!search.location || land.location === search.location) &&
      (!search.land_name || land.land_name === search.land_name) &&
      (!search.survey_number || land.survey_number === search.survey_number) &&
      (!search.owner || land.owner === search.owner) &&
      (!search.status || land.status === search.status)
  );

  // Calculate total acres based on status
  const registeredTotal = filteredData
    .filter((land) => land.status === "Registered")
    .reduce((sum, land) => sum + (parseFloat(land.acres) || 0), 0)
    .toFixed(2);

  const pendingTotal = filteredData
    .filter((land) => land.status === "Pending")
    .reduce((sum, land) => sum + (parseFloat(land.acres) || 0), 0)
    .toFixed(2);

  const totalAcres = (parseFloat(registeredTotal) + parseFloat(pendingTotal)).toFixed(2);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap gap-4 mb-6">
        <Select onValueChange={(value) => setSearch({ ...search, location: value })}>
          <SelectTrigger className="w-full md:w-1/4">
            <SelectValue placeholder="Select Location" />
          </SelectTrigger>
          <SelectContent>
            {getUniqueValues("location").map((loc, idx) => (
              <SelectItem key={idx} value={loc}>
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setSearch({ ...search, status: value })}>
          <SelectTrigger className="w-full md:w-1/4">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            {getUniqueValues("status").map((status, idx) => (
              <SelectItem key={idx} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setSearch({ ...search, land_name: value })}>
          <SelectTrigger className="w-full md:w-1/4">
            <SelectValue placeholder="Select Land Name" />
          </SelectTrigger>
          <SelectContent>
            {getUniqueValues("land_name").map((name, idx) => (
              <SelectItem key={idx} value={name}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setSearch({ ...search, survey_number: value })}>
          <SelectTrigger className="w-full md:w-1/4">
            <SelectValue placeholder="Select Survey Number" />
          </SelectTrigger>
          <SelectContent>
            {getUniqueValues("survey_number").map((survey, idx) => (
              <SelectItem key={idx} value={survey}>
                {survey}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setSearch({ ...search, owner: value })}>
          <SelectTrigger className="w-full md:w-1/4">
            <SelectValue placeholder="Select Owner" />
          </SelectTrigger>
          <SelectContent>
            {getUniqueValues("owner").map((owner, idx) => (
              <SelectItem key={idx} value={owner}>
                {owner}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <h2 className="text-xl font-bold mb-4">Total Acres: {totalAcres}</h2>
      <h3 className="text-lg font-semibold text-green-600">Registered Acres: {registeredTotal}</h3>
      <h3 className="text-lg font-semibold text-red-600">Pending Acres: {pendingTotal}</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredData.map((land, index) => (
          <Card key={index} className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-teal-600">{land.land_name}</CardTitle>
              <Badge variant={land.status === "Registered" ? "default" : "destructive"}>
                {land.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <p><strong>Location:</strong> {land.location}</p>
              <p><strong>Survey No:</strong> {land.survey_number}</p>
              <p><strong>Owner:</strong> {land.owner}</p>
              <p><strong>Acres:</strong> {land.acres}</p>
          
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
