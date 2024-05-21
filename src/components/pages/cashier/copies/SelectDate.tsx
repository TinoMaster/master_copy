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

export const SelectDate = ({
  onChangeDate,
  disabled,
}: {
  onChangeDate: (date: Date) => void;
  disabled: boolean;
}) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleChange = (date: Date | undefined) => {
    if (!date) return;
    setDate(date);
    onChangeDate(date);
  };

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
              {date ? format(date, "dd/MM/yyyy") : "Seleccionar fecha"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              disabled={disabled}
              mode="single"
              selected={date}
              onSelect={handleChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
