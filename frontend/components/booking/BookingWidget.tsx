import { useState } from 'react';
import { User, Calendar as CalendarIcon, Shield, MessageCircle } from 'lucide-react';
import { Dropdown } from '../ui/Dropdown';
import { Button } from '../ui/Button';

export const BookingWidget = () => {
  const [selectedGuests, setSelectedGuests] = useState(1);

  return (
    <div aria-label="Booking Widget">
      <div className="text-card-foreground overflow-hidden bg-white border-0 shadow-lg rounded-2xl">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[#284E4C] h-24"></div>
          <div className="relative p-6">
            <h3 className="text-lg font-semibold text-[#FFFFFF] mb-1">Book Your Stay</h3>
            <p className="text-sm text-[#D2DADA]">Select date to see prices</p>
          </div>
        </div>

        <div className="p-6 pt-4">
          <div className="space-y-1">
            <div className="flex gap-2">
              <div className="flex-1 grid w-full h-full [&>button]:w-full [&>button]:justify-start [&>button]:text-left [&>button]:h-[42px] [&>button]:bg-[#F1F3EE] [&>button]:border-0 [&>button]:shadow-sm [&>button]:hover:bg-[#FFFDF6] [&>button]:rounded-l-md [&>button]:rounded-r-none">
                <button className="flex items-center gap-2 px-3 text-sm text-gray-600">
                  <CalendarIcon className="w-4 h-4" />
                  <span>Select dates</span>
                </button>
              </div>
              <div>
                <Dropdown
                  trigger={
                    <button className="flex items-center justify-between w-full h-[42px] md:w-[120px] bg-[#F1F3EE] px-3 rounded-r-md hover:bg-[#FFFDF6] transition shadow-sm border-l border-white/50">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-4 h-4" />
                        <span>{selectedGuests}</span>
                      </div>
                    </button>
                  }
                  items={[1, 2, 3, 4].map((num) => ({
                    label: `${num}`,
                    onClick: () => setSelectedGuests(num),
                  }))}
                  align="right"
                  dropdownClassName="py-0!"
                  linkClassName="py-1.5!"
                  showChevron={false}
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-6">
            <Button disabled fullWidth size="lg" className="rounded-xl text-lg hover:bg-[#1f3d3b]">
              Check availability
            </Button>
            <Button
              variant="outline"
              fullWidth
              className="h-12 border-[#284E4C]/20 text-[#284E4C] hover:bg-[#284E4C]/5 hover:border-[#284E4C]/30"
            >
              <span className="inline-flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span>Send Inquiry</span>
              </span>
            </Button>
          </div>

          <div className="text-sm text-[#5C5C5A] text-center mt-4">
            <span className="inline-flex items-center gap-1">
              <Shield className="w-3 h-3" />
              <span>Instant booking confirmation</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
