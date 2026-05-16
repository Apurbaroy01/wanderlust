"use client";
import { authClient } from "@/lib/auth-client";
import { Calendar } from "@gravity-ui/icons";
import { DateField, Label } from "@heroui/react";
import { useState } from "react";


const BookingCard = ({ destination }) => {

    const { data: session } = authClient.useSession();
    const [date, setDate] = useState(null);


    const handleBooking = async () => {
        if (!session?.user) {
            alert("Please log in to book this destination.");
            return;
        }

        const BookingData = {
            userId: session.user.id,
            destinationId: destination._id,
            date: new Date(date),
        };
        // Handle booking logic here
        const res = await fetch("http://localhost:5000/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(BookingData),
        });
        if (res.ok) {
            alert("Booking successful!");
        } else {
            alert("Failed to book. Please try again.");
        }

        console.log("Booking Data:", res);
    };
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center">Booking Card</h2>
            <p className="font-semibold">${destination.price} per person</p>
            <DateField onChange={setDate} className="w-[256px]" name="date">
                <Label>Date<spnan className="text-red-500">*</spnan></Label>
                <DateField.Group>
                    <DateField.Prefix>
                        <Calendar className="size-4 text-muted" />
                    </DateField.Prefix>
                    <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
                </DateField.Group>
            </DateField>
            <div className="flex w-full gap-2">
                <button type="button"
                    onClick={handleBooking}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Book Now
                </button>
            </div>
        </div>
    );
};

export default BookingCard;