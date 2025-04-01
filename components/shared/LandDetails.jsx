"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { Download, X } from "lucide-react";
import { landData } from "@/data/landDetails";



const getUniqueValues = (key) => [...new Set(landData.map((item) => item[key]))];

export default function LandList() {
  const [search, setSearch] = useState({
    location: "",
    land_name: "",
    survey_number: "",
    owner: "",
    status: "",
  });

  const handleClearFilter = (key) => {
  
    setSearch((prev) => ({ ...prev, [key]: "" }));
  };

  const handleClearAll = () => {
    setSearch({ location: "", land_name: "", survey_number: "", owner: "", status: "" });
  };

  const filteredData = landData.filter(
    (land) =>
      (!search.location || land.location === search.location) &&
      (!search.land_name || land.land_name === search.land_name) &&
      (!search.survey_number || land.survey_number === search.survey_number) &&
      (!search.owner || land.owner === search.owner) &&
      (!search.status || land.status === search.status)
  );

  const handleDownload = (land) => {
    const filePath = `/images/${land.pdfFileName}.pdf`;
    const link = document.createElement("a");
    link.href = filePath;
    link.setAttribute("download", land.pdfFileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap gap-4 mb-6">
        {Object.keys(search).map((key) => (
          <div key={key} className="relative w-full md:w-1/4">
            <Select onValueChange={(value) => setSearch({ ...search, [key]: value })}>
              <SelectTrigger>
                <SelectValue placeholder={`Select ${key.replace("_", " ")}`} />
              </SelectTrigger>
              <SelectContent>
                {getUniqueValues(key).map((val, idx) => (
                  <SelectItem key={idx} value={val}>
                    {val}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {search[key] && (
              <button className="absolute top-2 right-2" onClick={() => handleClearFilter(key)}>
                <X size={16} />
              </button>
            )}
          </div>
        ))}
      </div>

      {Object.values(search).some((val) => val) && (
        <Button onClick={handleClearAll} className="mb-4">Clear All</Button>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredData.map((land, index) => (
          <Card key={index} className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-teal-600">{land.land_name}</CardTitle>
              <Badge variant={land.status === "Registered" ? "default" : "destructive"}>{land.status}</Badge>
            </CardHeader>
            <CardContent>
              <p><strong>Location:</strong> {land.location}</p>
              <p><strong>Survey No:</strong> {land.survey_number}</p>
              <p><strong>Owner:</strong> {land.owner}</p>
              <p><strong>Acres:</strong> {land.acres}</p>
              {land.pdfFileName && (
                <Button className="mt-4" onClick={() => handleDownload(land)}>
                  <Download className="mr-2" /> Download RTC
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
