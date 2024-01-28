'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DatePicker onChange={(date) => console.log(date)} inline />
    </main>
  );
}
