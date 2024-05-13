"use client";
import { format } from "date-fns";
import { cn } from "@/libs/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";

export const SelectDate = () => {
  const [date, setDate] = useState<Date>();
  return (
    <div className="w-full sm:w-min p-5 space-y-4 rounded-md">
      <h4 className="head-title-banner">Seleccionar fecha</h4>
      <div className="w-[180px]">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <FaRegCalendarAlt className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Elegir fecha</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
