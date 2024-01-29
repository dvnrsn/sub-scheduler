'use client';
import { createClient } from '@/utils/supabase/client';
import { isEqual } from 'date-fns';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { updateAvailability } from './actions';

export default function Scheduler() {
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const highlightWithRanges = [
    {
      'react-datepicker__date--selected': availableDates,
    },
  ];

  const supabase = createClient();
  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('user_availability').select();
      if (!data) return;
      setAvailableDates(data[1].dates.map((d: string) => new Date(d)));
    };
    getData();
  }, []);

  const handleDateChange = async (date: Date | null) => {
    if (!date) return;
    let newDates;
    if (availableDates.some((d) => isEqual(d, date))) {
      newDates = availableDates.filter((d) => !isEqual(d, date));
    } else {
      newDates = [...availableDates, date];
    }
    setAvailableDates(newDates);
    await updateAvailability(newDates);
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
