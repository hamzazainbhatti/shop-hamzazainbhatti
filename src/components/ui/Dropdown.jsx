import { useState } from "react";

export default function Dropdown({ label, options, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selection, setSelection] = useState("");

  return (
    <div className="relative">
      <div
        className="cursor-pointer border p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selection || label}
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full border bg-background">
          {options.map((option) => (
            <div
              key={option}
              className="cursor-pointer p-2 hover:bg-secondary"
              onClick={() => {
                setSelection(option);
                setIsOpen(false);
                onSelect?.(option);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
