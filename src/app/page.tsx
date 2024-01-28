'use client';
import { isEqual, subDays } from 'date-fns';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Home() {
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const highlightWithRanges = [
    {
      'react-datepicker__date--selected': availableDates,
    },
  ];

  const handleDateChange = (date: Date | null) => {
    if (!date) return;
    console.log(date, availableDates);
    if (availableDates.some((d) => isEqual(d, date))) {
      setAvailableDates(availableDates.filter((d) => !isEqual(d, date)));
    } else {
      setAvailableDates([...availableDates, date]);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DatePicker
        onChange={handleDateChange}
        inline
        highlightDates={highlightWithRanges}
        selected={null}
        filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
      />
    </main>
  );
}
