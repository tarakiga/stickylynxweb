"use client";
import PhoneButton from "./PhoneButton";

export default function PhoneButtonWrapper({ phones }: { phones: string[] }) {
  return <PhoneButton phones={phones} />;
} 